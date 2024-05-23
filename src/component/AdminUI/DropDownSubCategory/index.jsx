import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space } from 'antd';
import DeleteIcon from "@icon/deleteIcon.svg"
import EditIcon from "@icon/edit.svg"
import ModalCategory from '@component/ModalCategory';

let index = 0;
const DropDownSubCategory = ({ idCategory, handleChangeSubCategory, subCategory }) => {
    const [state, setState] = useState({
        items: [],
        name: '',
        idSubCategory: '',
        isModalOpen: false,
        modalType: '',
    })

    useEffect(() => {
        //goi api lay subCategory
        state.items = subCategory;
        setState((prev) => ({ ...prev }))
    }, [subCategory])

    const handleSelect = (value, option) => {
        state.idSubCategory =  option?.value
        state.name = option?.label
        setState((prev) => ({...prev}))
        console.log("id: ", option.value)
        console.log("name: ", option.label)
    }

    const inputRef = useRef(null);
    const onNameChange = (event) => {
        state.name = event.target.value
        setState((prev) => ({...prev}))
    };
    const addItem = (e) => {
        e.preventDefault();
        const body = {
            idCategory: idCategory,
            nameSubCategory: state.name
        }
        console.log("Body: ", body);
        //gọi api để add
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const handleEdit = () => {
        if (!state.idSubCategory) return;
        state.isModalOpen = !state.isModalOpen;
        state.modalType = 'edit';
        setState((prev) => ({...prev}));
    }
    
    const handleDelte = () => {
        if (!state.idSubCategory) return;
        state.isModalOpen = !state.isModalOpen;
        state.modalType = 'delete';
        setState((prev) => ({...prev}));
    };

    const onChangeSubName = (name) => {
        handleChangeSubCategory(name, state.idSubCategory);
        state.isModalOpen = false;
        setState(prev => ({...prev}));
    };

    return (
        <div className='flex items-center gap-3'>
            <Select
                onSelect={handleSelect}
                value={state.idSubCategory}
                style={{
                    width: 300,
                }}
                placeholder="Danh mục phụ"
                dropdownRender={(menu) => (
                    <>
                        {menu}
                        <Divider
                            style={{
                                margin: '8px 0',
                            }}
                        />
                        <Space
                            style={{
                                padding: '0 8px 4px',
                            }}
                        >
                            <Input
                                className='input-dropdown-sub'
                                placeholder="Nhập tên danh mục phụ mới"
                                type=''
                                ref={inputRef}
                                value={state.name}
                                onChange={onNameChange}
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
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
            <div onClick={handleEdit} className={` cursor-pointer ${state.idSubCategory === '' ? 'opacity-50' : 'opacity-100'}`}>
                <EditIcon />
            </div>
            <div onClick={handleDelte} className={` cursor-pointer ${state.idSubCategory === '' ? 'opacity-50' : 'opacity-100'}`}>
                <DeleteIcon />
            </div>
            <ModalCategory
                open={state.isModalOpen}
                type={state.modalType}
                onCancel={handleEdit}
                name={state.name}
                handleChangeName={onChangeSubName}
                idCategory={idCategory}
                idSubCategory={state.idSubCategory}
            />
        </div>
    );
};
export default DropDownSubCategory;