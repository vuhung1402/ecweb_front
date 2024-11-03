import Loading from "@component/Loading/Loading";
import { message, Tabs } from "antd";
import React, { useEffect } from "react";
import { useAddCategory, useDeleteCategory, useEditCategory, useGetCategories, useGetProducts, useHandleEditSubCategory } from "../products/function";
import useAdminProductStore from "@store/admin-product";
import ProductList from "@_components/Admin/Products/ProductList";
import ModalCategory from "@_components/Admin/Products/ModalCategory";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { logAgain } from "@utils/function";
import { useNavigate } from "react-router-dom";
import { SUCCESS } from "@utils/message";

const ChatBox = () => {

    const navigate = useNavigate();

    const { categoryId, setCategoryId, setIsModalOpen, isModalOpen, setActiveKey, activeKey,
        setModalType, modalType, setDeleteTab, deleteTab } = useAdminProductStore();

    const { isLoading: isGetCategories, isSuccess: isGetCategoriesSuccess, data: categories, refetch: refetchCategories } = useGetCategories();

    const { isLoading: isGetProducts, data: products, refetch: refetchProducts } = useGetProducts(categoryId);

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
        // setState((prev) => ({ ...prev }))
    };

    const handleChangeName = async (name, type) => {
        // const { activeKey, category } = state;

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

        // const isEditCategory = await handleEditSubCategory(body);

        // if (isEditCategory) {
        //     await getData();
        //     message.success("Thành công!!");
        // } else {
        //     message.error("Không thành công!!");
        // }
    };


    return (
        <>
            {
                isGetCategories ? <Loading /> :
                    (
                        <div className="w-full h-full p-4">
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
                                                // skeletonLoading={state.skeletonLoading}
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
                                            // getData={getData}
                                            // handleDetail={handleDetail}
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
                        </div>
                    )
            }
        </>
    )
}

export default ChatBox