import React, { useEffect, useState } from "react";

// libraty
import { Tabs, message } from "antd";

// component
import ProductList from "@component/AdminUI/ProductList";
import ModalCategory from "@component/ModalCategory";
import { uuid } from "@utils/function";

import { products, category } from "./mock";
import { addCategory, deleteCategory, editCategory, getCategories, getProducts, handleEditSubCategory } from "./function";
import Loading from "@component/Loading/Loading";

const Products = (props) => {

    const { url } = props;

    const [state, setState] = useState({
        isModalOpen: false,
        isModalDeleteOpen: false,
        category: [],
        activeKey: '',
        modalType: '',
        products: [],
        dataTest: [],
    });

    const getData = async () => {
        const categories = await getCategories();
        state.activeKey = localStorage.getItem('category_id') ? localStorage.getItem('category_id') : categories?.[0]?.category_id;
        const products = await getProducts(state.activeKey);
        state.category = categories;
        state.products = products;
        setState((prev) => ({ ...prev }));
    };

    const filterData = async (idSubCategory) => {
        const productFilter = await getProducts(idSubCategory);
        state.products = productFilter;
        setState((prev) => ({ ...prev }));
    }

    // goi ham de get data
    useEffect(() => {
        getData();
    }, [state.activeKey]);

    const onChangeTab = (newActiveKey) => {
        localStorage.setItem('category_id', newActiveKey);
        state.activeKey = newActiveKey;
        setState((prev) => ({ ...prev }))
    };

    const handleOpenModal = (type, targetKey) => {
        state.isModalOpen = !state.isModalOpen;
        state.modalType = type;
        state.activeKey = targetKey;
        setState((prev) => ({ ...prev }))
    };

    const onEdit = (targetKey, action) => {
        const modalType = action === 'add' ? 'create' : 'delete';
        handleOpenModal(modalType, targetKey);
        setState((prev) => ({ ...prev }));
    };

    const handleDelteCategory = async () => {
        const isDelete = await deleteCategory(state.activeKey);
        if (isDelete) {
            message.success("Xoá danh mục thành công!!");
            state.isModalOpen = !state.isModalOpen;
            await getData();
        } else {
            message.error("Xoá danh mục không thành công!!");
            state.isModalOpen = !state.isModalOpen;
        }
        setState((prev) => ({ ...prev }));
    }

    // change tab name --> tạm ok // có api thì chỉ push name lên server
    const handleChangeName = async (name, type) => {
        const { activeKey, category } = state;

        if (type === 'edit') {
            const isEditCategory = await editCategory(name, activeKey);
            if (isEditCategory) {
                message.success("Cập nhật thành công!!");
                state.isModalOpen = false;
                await getData()
            } else {
                message.error("Cập nhật không thành công!!");
                state.isModalOpen = false;
            }
        } else if (type === 'create') {
            const isAddCategory = await addCategory(name);
            if (isAddCategory) {
                message.success("Thêm mới thành công!!");
                state.isModalOpen = false;
                await getData()
            } else {
                message.error("Thêm mới không thành công");
                state.isModalOpen = false;
            }
        };
        setState((prev) => ({ ...prev }));
    };

    //---ok

    const handleChangeSubCategory = async (name, sub_category_id) => {
        const { activeKey } = state;

        const isEditCategory = await handleEditSubCategory(name, activeKey, sub_category_id);

        if (isEditCategory) {
            await getData();
            message.success("Thành công!!");
        } else {
            message.error("Không thành công!!");
        }
    };

    return (
        <>
            {
                state.category.length === 0 ? <Loading /> :
                    (
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
                                                filterData={filterData}
                                                products={state.products}
                                                idCategory={item?.category_id}
                                                name={item?.name}
                                                subCategory={item?.sub_category}
                                                handleChangeSubCategory={handleChangeSubCategory}
                                                handleChangeName={handleChangeName}
                                                handleOpenModal={handleOpenModal}
                                                getData={getData}
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
                                handleDeleteTab={handleDelteCategory}
                            />
                        </div>
                    )
            }
        </>
    )
}

export default Products