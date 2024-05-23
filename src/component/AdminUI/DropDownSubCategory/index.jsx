import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space } from 'antd';
import DeleteIcon from "@icon/deleteIcon.svg"
import EditIcon from "@icon/edit.svg"
import ModalCategory from '@component/ModalCategory';

const DropDownSubCategory = (props) => {
    const { idCategory,  subCategory, idSubCategory, name} = props;
    const { handleChangeSubCategory, onNameChange, handleSelect } = props;

    const [state, setState] = useState({
        items: [],
        name: '',
        idSubCategory: '',
        isModalOpen: false,
        modalType: '',
    });

    useEffect(() => {
        //goi api lay subCategory
        state.items = subCategory;
        setState((prev) => ({ ...prev }))
    }, [subCategory])

    const inputRef = useRef(null);
    
    const addItem = (e) => {
        e.preventDefault();

        const body = {
            idCategory: idCategory,
            nameSubCategory: name
        };

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

    const onChangeSubName = (name) => {
        handleChangeSubCategory(name, idSubCategory);
        state.isModalOpen = false;
        setState(prev => ({...prev}));
    };

    return (
        <div className='flex items-center gap-3'>
            <Select
                onSelect={handleSelect}
                value={idSubCategory}
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