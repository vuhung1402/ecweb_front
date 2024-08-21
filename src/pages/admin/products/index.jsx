import React, { useEffect, useState } from "react";

// libraty
import { Tabs, message } from "antd";

// component
import ProductList from "@component/AdminUI/ProductList";
import ModalCategory from "@component/ModalCategory";

import { addCategory, deleteCategory, editCategory, getCategories, getProducts, handleEditSubCategory } from "./function";
import Loading from "@component/Loading/Loading";

const Products = (props) => {

    const { isModifiedProduct } = props;
    const { handleDetail } = props;

    const [state, setState] = useState({
        isModalOpen: false,
        isModalDeleteOpen: false,
        category: undefined,
        deleteTab: '',
        activeKey: '',
        modalType: '',
        products: undefined,
        dataTest: [],
        skeletonLoading: false,
    });

    const getData = async () => {
        const categories = await getCategories();
        state.activeKey = localStorage.getItem('category_id') ? localStorage.getItem('category_id') : categories?.[0]?.category_id;
        const products = await getProducts(state.activeKey);
        setState((prev) => (
            {
                ...prev,
                activeKey: localStorage.getItem('category_id') ? localStorage.getItem('category_id') : categories?.[0]?.category_id,
                category: categories,
                products: products,
                skeletonLoading: false,
            }
        ));
    };

    // get all when product has modified
    useEffect(() => {
        getData();
    },[isModifiedProduct]);

    const filterData = async (idSubCategory) => {
        state.skeletonLoading = true;
        setState(prev => ({...prev}));
        if (idSubCategory === '') {
            getData();
            return;
        };
        const productFilter = await getProducts(idSubCategory);
        setState((prev) => ({ ...prev, skeletonLoading: false, products: productFilter }));
    };

    // goi ham de get data
    useEffect(() => {
        getData();
    }, [state.activeKey]);

    const onChangeTab = (newActiveKey) => {
        localStorage.setItem('category_id', newActiveKey);
        setState((prev) => ({ 
            ...prev, 
            activeKey: newActiveKey, 
            products: undefined,
         }))
    };

    const onEdit = (targetKey, action) => {
        const modalType = action === 'add' ? 'create' : 'delete';
        handleOpenModal(modalType, targetKey);
        setState((prev) => ({ ...prev }));
    };

    const handleOpenModal = (type, targetKey) => {
        state.isModalOpen = !state.isModalOpen;
        state.modalType = type;
        if (type === 'delete') {
            state.deleteTab = targetKey;
        }
        if (type === 'edit') {
            state.activeKey = targetKey;
        }
        setState((prev) => ({ ...prev }))
    };
    const handleDelteCategory = async () => {
        const isDelete = await deleteCategory(state.deleteTab);
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
            const response = await addCategory(name);
            if (response?.success) {
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
                state.category === undefined ? <Loading /> :
                    (
                        <div className="w-full h-full p-4">
                            <Tabs
                                type="editable-card"
                                className="font-bold"
                                onChange={onChangeTab}
                                activeKey={state.activeKey}
                                onEdit={onEdit}
                                items={state.category?.map((item) => {
                                    return {
                                        label: item.name,
                                        key: item?.category_id,
                                        children: (
                                            <ProductList
                                                skeletonLoading={state.skeletonLoading}
                                                filterData={filterData}
                                                products={state.products}
                                                idCategory={item?.category_id}
                                                name={item?.name}
                                                subCategory={item?.sub_category}
                                                handleChangeSubCategory={handleChangeSubCategory}
                                                handleChangeName={handleChangeName}
                                                handleOpenModal={handleOpenModal}
                                                getData={getData}
                                                handleDetail={handleDetail}
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