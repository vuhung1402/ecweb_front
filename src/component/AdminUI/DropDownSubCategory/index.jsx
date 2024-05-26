import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space, message } from 'antd';
import DeleteIcon from "@icon/deleteIcon.svg"
import EditIcon from "@icon/edit.svg"
import ModalCategory from '@component/ModalCategory';
import { addSubCategory } from '@pages/admin/products/function';

const DropDownSubCategory = (props) => {
    const { idCategory,  subCategory, idSubCategory, name} = props;
    const { handleChangeSubCategory, onNameChange, handleSelect, getData } = props;

    const [state, setState] = useState({
        items: [],
        name: '',
        idSubCategory: '',
        isModalOpen: false,
        modalType: '',
        isLoading: false,
    });

    useEffect(() => {
        //goi api lay subCategory
        console.log("subCategory: ", subCategory)
        state.isLoading=false;
        state.items = subCategory;
        setState((prev) => ({ ...prev }))
    }, [subCategory, state.isModalOpen])

    const inputRef = useRef(null);
    
    const addItem = async (e) => {
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

    return (
        <div className='flex items-center gap-3'>
            <Select
                onSelect={handleSelect}
                // value={idSubCategory}
                style={{width: 300}}
                placeholder="Danh mục phụ"
                dropdownRender={(menu) => (
                    <>
                        {menu}
                        <Divider style={{margin: '8px 0'}}/>

                        <Space style={{padding: '0 8px 4px'}}>
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
                name={name}
                handleChangeName={onChangeSubName}
            />
        </div>
    );
};
export default DropDownSubCategory;