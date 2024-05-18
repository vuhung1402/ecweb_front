import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space } from 'antd';
import DeleteIcon from "@icon/deleteIcon.svg"
import EditIcon from "@icon/edit.svg"
import ModalCategory from '@component/ModalCategory';


let index = 0;
const DropDownSubCategory = ({ idCategory }) => {
    const data = [
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

    const [state, setState] = useState({
        items: [],
        name: '',
        idSubCategory: '',
        isModalOpen: false,
        modalType: '',
    })

    useEffect(() => {
        //goi api lay subCategory
        state.items = data;
        setState((prev) => ({ ...prev }))
    }, [])

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
        state.isModalOpen = !state.isModalOpen;
        state.modalType = 'edit';
        setState((prev) => ({...prev}));
    }

    const handleDelte = () => {
        state.isModalOpen = !state.isModalOpen;
        state.modalType = 'delete';
        setState((prev) => ({...prev}));
    }

    return (
        <div className=' flex items-center gap-3 px-4'>
            <Select
                onSelect={handleSelect}
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
                                placeholder="Nhập tên danh mục phụ mới"
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
                options={state.items.map((item) => ({
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
            <ModalCategory open = {state.isModalOpen} type = {state.modalType} onCancel = {handleEdit} name = {state.name} idCategory = {idCategory} idSubCategory = {state.idSubCategory} />
        </div>
    );
};
export default DropDownSubCategory;