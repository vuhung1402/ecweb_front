import React, { useEffect, useState, useRef } from 'react';

import { Modal } from 'antd'

const ModalCategory = (props) => {
    const { type, open, name, idCategory, idSubCategory} = props;
    const { onCancel, handleChangeName, handleDeleteTab } = props;

    const [state, setState]  = useState({
        name: ''
    });

    const inputRef = useRef(null);

    useEffect(() => {
        state.name = name;
        setState((prev) => ({...prev}));
    },[name]);

    useEffect(() => {
        console.log('re-render');
        if (inputRef && inputRef.current) inputRef.current.focus();
    },[open])

    const handleOK = () => {
        if (type === 'delete') handleDeleteTab();
        if (type === 'edit' || type === 'create') {
            handleChangeName(state.name);
        };
    };

    const renderTab = {
        'delete': (
            <p>Vui lòng kiểm tra kỹ trước khi xác nhận xoá</p>
        ),
        'edit': (
            <input
                ref={inputRef}
                onChange={(e) => setState(prev => ({...prev, name: e.target.value}))}
                value={state.name}
                className="p-3 text-sm outline-none border w-full"
                placeholder="Tên danh mục sản phẩm"
            />
        ),
        'create': (
            <input
                ref={inputRef}
                onChange={(e) => setState(prev => ({...prev, name: e.target.value}))}
                value={state.name}
                className="p-3 text-sm outline-none border w-full"
                placeholder="Tên danh mục sản phẩm"
            />
        )
    }[type];

    const title = {
        'delete': 'Bạn có chắc chắn muốn xoá!!',
        'edit': 'Chỉnh sửa danh mục sản phẩm',
        'create': 'Tạo mới danh mục sản phẩm',
    }[type]

    const okText = {
        'delete': 'Xoá',
        'edit': 'Xác nhận',
        'create': 'Thêm mới',
    }[type]

    return (
        <div>
            <Modal
                title={title}
                open={open}
                okText={okText}
                okType={type === 'delete' ? 'danger' : 'primary'}
                cancelText={'Huỷ'}
                onOk={handleOK}
                onCancel={onCancel}
            >
                {renderTab}
            </Modal>
        </div>
    );
};

export default ModalCategory;