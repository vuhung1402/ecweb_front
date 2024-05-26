import React, { useEffect, useState, useRef } from 'react';

import { Modal } from 'antd'

const ModalCategory = (props) => {
    const { type, open, name } = props;
    const { onCancel, handleChangeName, handleDeleteTab } = props;

    const [state, setState]  = useState({
        name: '',
        confirmLoading: false,
    });

    const inputRef = useRef(null);

    // set name
    useEffect(() => {
        state.name = name;
        setState((prev) => ({...prev}));
    },[name, open]);

    useEffect(() => {
        setState((prev) => ({...prev, confirmLoading: false}));
    },[open])

    // focus on input
    useEffect(() => {
        if (inputRef && inputRef.current) inputRef.current.focus();
    },[open]);

    // handle when click in ok button
    const handleOK = async () => {
        setState(prev => ({...prev, confirmLoading: true}))
        if (type === 'delete'){
            await handleDeleteTab();
        };
        if (type === 'edit' || type === 'create') {
            await handleChangeName(state.name, type);
            state.name = '';
        };
    };

    // render title
    const title = {
        'delete': 'Bạn có chắc chắn muốn xoá!!',
        'edit': 'Chỉnh sửa danh mục sản phẩm',
        'create': 'Tạo mới danh mục sản phẩm',
    }[type]

    // render ok text
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
                confirmLoading={state.confirmLoading}
                onOk={handleOK}
                onCancel={onCancel}
            >
                { type === 'delete' && <p>Vui lòng kiểm tra kỹ trước khi xác nhận xoá</p> }

                { (type === 'edit' || type === 'create') && (
                    <input
                        ref={inputRef}
                        onChange={(e) => setState(prev => ({...prev, name: e.target.value}))}
                        value={state.name}
                        className="p-3 text-sm outline-none border w-full"
                        placeholder="Tên danh mục sản phẩm"
                    />
                ) }
            </Modal>
        </div>
    );
};

export default ModalCategory;