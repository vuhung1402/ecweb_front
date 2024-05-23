import React, { useEffect, useState } from "react";

// libraty
import { Tabs } from "antd";

// component
import ProductList from "@component/AdminUI/ProductList";
import ModalCategory from "@component/ModalCategory";
import { uuid } from "@utils/function";

import { products, category } from "./mock";

const Products = (props) => {

    const { url } = props;

    const [state, setState] = useState({
        isModalOpen: false,
        isModalDeleteOpen: false,
        category: [],
        activeKey: '', 
        modalType: '',
        products: [],
    });

    const getData = async () => {
        state.category = category;
        state.products = products;
        state.activeKey = category?.[0]?.category_id;
        setState((prev) => ({...prev}));
    };

    // goi ham de get data
    useEffect(() => {
        getData(); 
    },[]);

    const onChangeTab = (newActiveKey) => {
        state.activeKey = newActiveKey;
        setState((prev) => ({ ...prev }))
    };

    const handleOpenModal = (type) => {
        state.isModalOpen = !state.isModalOpen;
        state.modalType = type;
        setState((prev) => ({...prev}))
    };

    const onEdit = (targetKey, action) => {
        const modalType = action === 'add' ? 'create' : 'delete';
        handleOpenModal(modalType);
        setState((prev) => ({...prev}));
    };

    // change tab name --> tạm ok // có api thì chỉ push name lên server
    const handleChangeName = (name, type) => {
        const { activeKey, category } = state;

        const updateData = [...category];
        let newData = [];

        if(type === 'edit'){
            newData = updateData?.map((item) => {
                if (item?.category_id === activeKey) {
                    return {
                        ...item,
                        name: name,
                    };
                };
    
                return item;
            });
        } else if (type === 'create') {
            const schema = {
                name,
                route: `xem-tat-ca-${name}`,
                category_id: uuid(),
                sub_category: [],
            };

            updateData?.push(schema)
        };

        state.isModalOpen = false;
        state.category = type === 'create' ? updateData : newData ;
        setState(prev => ({...prev}));
    };

    //---ok

    const handleChangeSubCategory = (name, sub_category_id) => {
        const { activeKey, category } = state;

        const updateData = [...category];
        const newData = updateData?.map((item) => {
            if (item?.category_id === activeKey) {
                const sub = [...item.sub_category];
                const newSub = sub?.map((value) => {
                    console.log(value);
                    if (value?.sub_category_id === sub_category_id) return { ...value, name: name };
                    return value;
                });

                return {
                    ...item,
                    sub_category: newSub,
                };
            };

            return item;
        });

        state.category = newData;
        setState(prev => ({...prev}));
    };

    return (
        <div className="w-full h-full p-4">
            <Tabs
                type="editable-card"
                onChange={onChangeTab}
                activeKey={state.activeKey}
                onEdit={onEdit}
                items={state.category?.map((item) => {
                    return {
                        label: item.name,
                        key: item?.category_id,
                        children: (
                            <ProductList
                                products={state.products}
                                idCategory={item?.category_id}
                                name={item?.name}
                                subCategory={item?.sub_category}
                                handleChangeSubCategory={handleChangeSubCategory}
                                handleChangeName={handleChangeName}
                                handleOpenModal={handleOpenModal}
                            />
                        )
                    }
                })}
            />

            <ModalCategory
                open={state.isModalOpen}
                type={state.modalType}
                name={state.modalType === 'edit' ? state.category.find(item => item?.category_id === state.activeKey)?.name : ''}
                onCancel={handleOpenModal}
                handleChangeName={handleChangeName}
            />
        </div>
    )
}

export default Products