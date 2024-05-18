import React, { useEffect, useState } from 'react';

import { Modal } from 'antd'

const ModalCategory = (props) => {
    const { type, open, name, idCategory, idSubCategory} = props;
    const { onOk, onCancel } = props;
    console.log("name: ", name)
    console.log("type: ", type )
    const [state, setState]  = useState({
        name: ''
    })

    useEffect(() => {
        state.name = name
        setState((prev) => ({...prev}))
    },[name])

    // const handleOK = (event) => {
    //     if (type === 'delete' && typeof onOk === 'function') {
    //         onOk(event, id)
    //     }
    // }

    const handleChangeName = (e) => {
        state.name = e.target.value
        setState((prev) => ({...prev}))
    }

    const renderTab = {
        'delete': (
            <p>Vui lòng kiểm tra kỹ trước khi xác nhận xoá</p>
        ),
        'edit': (
            <input onChange={handleChangeName} value={state.name} className="p-3 text-sm outline-none border w-full" placeholder="Tên danh mục sản phẩm" />
        ),
        'create': (
            <input className="p-3 text-sm outline-none border w-full" placeholder="Tên danh mục sản phẩm" />
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
                onOk={onOk}
                onCancel={onCancel}
            >
                {renderTab}
            </Modal>
        </div>
    );
};

export default ModalCategory;