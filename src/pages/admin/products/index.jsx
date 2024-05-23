import React, { useEffect, useState } from "react";

// libraty
import { Tabs } from "antd";

// component
import ProductList from "@component/AdminUI/ProductList";
import ModalCategory from "@component/ModalCategory";
import { uuid } from "@utils/function";

const Products = ({url}) => {
    const data = [
        {
            "name": "Áo",
            "route": "xem-tat-ca-ao",
            "category_id": "a",
            "sub_category": [
                {
                    "sub_category_id": "1",
                    "name": "Áo Thun",
                    "route": "ao-thun"
                },
                {
                    "sub_category_id": "2",
                    "name": "Áo Sơ Mi",
                    "route": "ao-so-mi"
                },
                {
                    "sub_category_id": "3",
                    "name": "Áo Polo",
                    "route": "ao-polo"
                }
            ]
        },
        {
            "name": "Quần",
            "route": "xem-tat-ca-ao",
            "category_id": "q",
        }
    ];

    const [state, setState] = useState({
        isModalOpen: false,
        isModalDeleteOpen: false,
        data: [],
        activeKey: '', 
        modalType: '',
    });

    useEffect(() => {
        //goi ham de get data
        state.data = data;
        state.activeKey = data?.[0]?.category_id;
        setState((prev) => ({...prev}))
    },[])

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

    // change tab name
    const handleChangeName = (name, type) => {
        const { activeKey, data } = state;
        const updateData = [...data];
        let newData; 

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
        }else if(type === 'create'){
            console.log("Update data: ", updateData)
            const schema = {
                name,
                route: `xem-tat-ca-${name}`,
                category_id: uuid(),
                sub_category: [],
            }
            updateData?.push(schema)
            console.log("newData: ", newData)
        }

        state.isModalOpen = false;
        state.data = type === 'create' ? updateData : newData ;
        setState(prev => ({...prev}));
    };

    const handleChangeSubCategory = (name, sub_category_id) => {
        const { activeKey, data } = state;

        const updateData = [...data];
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

        state.data = newData;
        setState(prev => ({...prev}));
    };

    return (
        <div className="w-full h-full p-4">
            <Tabs
                type="editable-card"
                onChange={onChangeTab}
                activeKey={state.activeKey}
                onEdit={onEdit}
                items={state.data?.map((item) => {
                    return {
                        label: item.name,
                        key: item?.category_id,
                        children: (
                            <ProductList
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
                name={state.modalType === 'edit' ? state.data.find(item => item?.category_id === state.activeKey)?.name : ''}
                onCancel={handleOpenModal}
                handleChangeName={handleChangeName}
            />
        </div>
    )
}

export default Products