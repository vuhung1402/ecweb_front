import React, { useEffect } from "react";

// libraty
import { Tabs, message } from "antd";

// component
import ModalCategory from "@_components/Admin/Products/ModalCategory";
import ProductList from "@_components/Admin/Products/ProductList";

import useAdminProductStore from "@store/admin-product";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { logAgain } from "@utils/function";
import { FAIL, SUCCESS } from "@utils/message";
import { useNavigate } from "react-router-dom";
import { useAddCategory, useDeleteCategory, useEditCategory, useHandleEditSubCategory } from "../products/function";
import ProductsContainer from "./ProductsContainer";

const Products = (props) => {

    const {  isGetCategories, isGetCategoriesSuccess, categories, isGetProducts, products } = props;
    const { handleDetail, refetchCategories, refetchProducts } = props;

    const navigate = useNavigate();

    const { setCategoryId, setIsModalOpen, isModalOpen, setActiveKey, activeKey,
        setModalType, modalType, setDeleteTab, deleteTab } = useAdminProductStore();

    const mutateEditCategory = useEditCategory();

    const mutateAddCategory = useAddCategory();

    const mutateDeleteCategory = useDeleteCategory();

    const mutateEditSubCategory = useHandleEditSubCategory();

    useEffect(() => {
        if (isGetCategoriesSuccess) {
            setCategoryId(categories?.category?.[0]?.category_id);
            setActiveKey(categories?.category?.[0]?.category_id);
        }
    }, [isGetCategories, mutateDeleteCategory.isSuccess])

    const onChangeTab = (activeKey) => {
        setCategoryId(activeKey);
        setActiveKey(activeKey);
    }

    const filterData = (value) => {
        setCategoryId(value);
    }

    const onEdit = (targetKey, action) => {
        const modalType = action === 'add' ? 'create' : 'delete';
        handleOpenModal(modalType, targetKey);
    };

    const handleOpenModal = (type, targetKey) => {
        setIsModalOpen(isModalOpen);
        setModalType(type);
        if (type === 'delete') {
            setDeleteTab(targetKey);
        }
        if (type === 'edit') {
            setActiveKey(targetKey);
        }
    };

    const handleChangeName = async (name, type) => {

        if (type === 'edit') {
            const body = {
                name,
                category_id: activeKey,
            }
            mutateEditCategory.mutateAsync(body, {
                onSuccess: () => {
                    message.success("Cập nhật thành công!!");
                    setIsModalOpen(isModalOpen);
                    refetchCategories();
                },
                onError: (error) => {
                    const response = error?.response?.data;
                    if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                        logAgain();
                        navigate('/login');
                    } else {
                        setIsModalOpen(isModalOpen);
                        message.error(FAIL);
                    }
                }
            });
        } else if (type === 'create') {
            const body = {
                name
            };
            mutateAddCategory.mutateAsync(body, {
                onSuccess: () => {
                    message.success(SUCCESS);
                    setIsModalOpen(isModalOpen);
                    refetchCategories();
                },
                onError: (error) => {
                    const response = error?.response?.data;
                    if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                        logAgain();
                        navigate('/login');
                    } else {
                        setIsModalOpen(isModalOpen);
                        message.error(FAIL);
                    }
                }
            })
        }
    };

    const handleDelteCategory = async () => {
        const body = {
            category_id: deleteTab,
        }
        mutateDeleteCategory.mutateAsync(body, {
            onSuccess: () => {
                message.success(SUCCESS);
                setIsModalOpen(isModalOpen);
                refetchCategories();
            },
            onError: (error) => {
                const response = error?.response?.data;
                if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate('/login');
                } else {
                    setIsModalOpen(isModalOpen);
                    message.error(FAIL);
                }
            }
        })
    }

    const handleChangeSubCategory = async (name, sub_category_id) => {
        const body = {
            name,
            category_id: activeKey,
            sub_category_id,
        }

        await mutateEditSubCategory.mutateAsync(body, {
            onSuccess: () => {
                message.success(SUCCESS);
                refetchCategories();
            },
            onError: (error) => {
                const response = error?.response?.data;
                if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate('/login');
                } else {
                    message.error(FAIL);
                }
            }
        })
    };


    return (
        <ProductsContainer isGetCategories={isGetCategories}>
            <Tabs
                type="editable-card"
                className="font-bold"
                onChange={onChangeTab}
                activeKey={activeKey}
                onEdit={onEdit}
                items={categories?.category?.map((item) => {
                    return {
                        label: item.name,
                        key: item?.category_id,
                        children: (
                            <ProductList
                                refetchCategories={refetchCategories}
                                isGetProducts={isGetProducts}
                                refetchProducts={refetchProducts}
                                filterData={filterData}
                                products={products}
                                idCategory={item?.category_id}
                                name={item?.name}
                                subCategory={item?.sub_category}
                                handleChangeSubCategory={handleChangeSubCategory}
                                handleOpenModal={handleOpenModal}
                                pendingEditSubCategory={mutateEditSubCategory.isPending}
                                handleDetail={handleDetail}
                            />
                        )
                    }
                })}
            />

            <ModalCategory
                pendingEditCategory={mutateEditCategory.isPending}
                pendingAddCategory={mutateAddCategory.isPending}
                pendingDeleteCategory={mutateDeleteCategory.isPending}
                open={isModalOpen}
                type={modalType}
                name={modalType === 'edit' ? categories?.category.find(item => item?.category_id === activeKey)?.name : ''}
                onCancel={handleOpenModal}
                handleChangeName={handleChangeName}
                handleDeleteTab={handleDelteCategory}
            />
        </ProductsContainer>
    )
}

export default Products