import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space, message } from 'antd';
import DeleteIcon from "@icon/deleteIcon.svg"
import EditIcon from "@icon/edit.svg"
import ModalCategory from '@component/ModalCategory';
import { addSubCategory, deleteSubCategory } from '@pages/admin/products/function';

const DropDownSubCategory = (props) => {
    const { idCategory,  subCategory, idSubCategory, name} = props;
    const { handleChangeSubCategory, onNameChange, handleSelect, getData } = props;

    const [state, setState] = useState({
        items: [],
        name: '',
        // idSubCategory: '',
        isModalOpen: false,
        modalType: '',
        isLoading: false,
    });

    useEffect(() => {
        //goi api lay subCategory
        const defaultItem = [{
            "sub_category_id": "",
            "name": "Xem tất cả",
        }];

        const subItem = defaultItem.concat(subCategory)

        state.isLoading=false;
        state.items = subItem;
        setState((prev) => ({ ...prev }))
    }, [subCategory, state.isModalOpen, idSubCategory])

    const inputRef = useRef(null);
    
    const addItem = async (e) => {
        localStorage.setItem('category_id', idCategory);
        e.preventDefault();
        setState((prev) => ({ ...prev, isLoading:true }))
        const isAddSubCategory = await addSubCategory(name, idCategory);
        if(isAddSubCategory){
            await getData()
            message.success("Thêm thành công!!");
        }else{
            message.error("Không thành công!!")
            setState((prev) => ({ ...prev, isLoading:false }))
        }

        //gọi api để add
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
        const isDeleteCategory = await deleteSubCategory(idCategory, idSubCategory);
        if(isDeleteCategory){
            message.success("Thành công!!");
            await getData();
        }else{
            message.error("Không thành công!!");
        }
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
                                loading={state.isLoading}
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