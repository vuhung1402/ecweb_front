import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space, message } from 'antd';
import DeleteIcon from "@icon/deleteIcon.svg"
import EditIcon from "@icon/edit.svg"
import ModalCategory from '@_components/Admin/Products/ModalCategory';
import { addSubCategory, deleteSubCategory, useAddSubCategory, useDeleteSubCategory } from '@pages/admin/products/function';
import { logAgain } from '@utils/function';
import { useNavigate } from 'react-router-dom';
import { NOT_AUTHENTICATION, TOKEN_INVALID } from '@utils/error';
import { FAIL, SUCCESS } from '@utils/message';

const DropDownSubCategory = (props) => {
    const { idCategory,  subCategory, idSubCategory, name, pendingEditSubCategory} = props;
    const { handleChangeSubCategory, onNameChange, handleSelect, refetchCategories } = props;

    const [state, setState] = useState({
        items: [],
        name: '',
        // idSubCategory: '',
        isModalOpen: false,
        modalType: '',
        isLoading: false,
    });

    const navigate = useNavigate();

    const mutateAddSubCategory = useAddSubCategory();

    const mutateDeleteSubCategory = useDeleteSubCategory();

    useEffect(() => {
        //goi api lay subCategory
        const defaultItem = [{
            "sub_category_id": "",
            "name": "Xem tất cả",
        }];

        const subItem = defaultItem.concat(subCategory)

        state.items = subItem;
        setState((prev) => ({ ...prev }))
    }, [subCategory, state.isModalOpen, idSubCategory])

    const inputRef = useRef(null);
    
    const addItem = async (e) => {
        localStorage.setItem('category_id', idCategory);
        e.preventDefault();
        const body = {
            name_sub_category: name,
            id: idCategory,
        }
        mutateAddSubCategory.mutateAsync(body, {
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
        });
    };

    const handleEdit = () => {
        localStorage.setItem('category_id', idCategory);
        if (!idSubCategory) return;
        state.isModalOpen = !state.isModalOpen;
        state.modalType = 'edit';
        setState((prev) => ({...prev}));
    }
    
    const handleDelte = () => {
        if (!idSubCategory) return;
        state.isModalOpen = !state.isModalOpen;
        state.modalType = 'delete';
        setState((prev) => ({...prev}));
    };

    const onChangeSubName = async (name) => {
        await handleChangeSubCategory(name, idSubCategory);
        state.isModalOpen = false;
        setState(prev => ({...prev}));
    };

    const handleDeleteTab = async () => {
        const body = {
            category_id: idCategory,
            sub_category_id: idSubCategory,
        }
        await mutateDeleteSubCategory.mutateAsync(body, {
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
        // const isDeleteCategory = await deleteSubCategory(body);
        // if(isDeleteCategory){
        //     message.success("Thành công!!");
        //     await getData();
        // }else{
        //     message.error("Không thành công!!");
        // }
        state.isModalOpen = false;
        setState(prev => ({...prev}));
    }

    return (
        <div className='w-full flex justify-end items-center gap-3'>
            <Select
                onSelect={handleSelect}
                value={idSubCategory}
                className='w-full sm:w-[300px]'
                // style={{width: 300, maxWidth: 300}}
                placeholder="Danh mục phụ"
                dropdownRender={(menu) => (
                    <>
                        {menu}
                        <Divider style={{margin: '8px 0'}}/>

                        <Space className='flex flex-col items-end sm:flex-row' style={{padding: '0 8px 4px'}}>
                            <Input
                                className='input-dropdown-sub'
                                placeholder="Nhập tên danh mục phụ mới"
                                type=''
                                ref={inputRef}
                                value={name}
                                onChange={onNameChange}
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button
                                loading={mutateAddSubCategory.isPending}
                                type="text"
                                icon={<PlusOutlined />}
                                onClick={addItem}
                            >
                                Add item
                            </Button>
                        </Space>
                    </>
                )}
                options={state.items?.map((item) => ({
                    label: item?.name,
                    value: item?.sub_category_id,
                }))}
            />
            <div onClick={handleEdit} className={` cursor-pointer ${idSubCategory === '' ? 'opacity-50' : 'opacity-100'}`}>
                <EditIcon />
            </div>
            <div onClick={handleDelte} className={` cursor-pointer ${idSubCategory === '' ? 'opacity-50' : 'opacity-100'}`}>
                <DeleteIcon />
            </div>
            <ModalCategory
                isPendingDeleteSubCategory={mutateDeleteSubCategory.isPending}
                pendingEditSubCategory={pendingEditSubCategory}
                open={state.isModalOpen}
                type={state.modalType}
                onCancel={handleEdit}
                handleDeleteTab={handleDeleteTab}
                name={name}
                handleChangeName={onChangeSubName}
            />
        </div>
    );
};
export default DropDownSubCategory;