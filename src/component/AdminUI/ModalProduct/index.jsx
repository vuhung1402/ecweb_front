import { Modal } from "antd";
import React, { useEffect } from "react";
import AddProduct from "../AddProduct";
import "./style.scss"

const ModalProduct = (props) => {

    const { open, type } = props
    const { onOk, onCancel } = props

    useEffect(() => {
        const element = document.getElementsByClassName('ant-modal-content');
        const modalBodyElement = document.getElementsByClassName('ant-modal-body');

        if (element?.[0]) {
            const parentNode = element?.[0]?.parentElement;
            parentNode.style.height = '100%';
        };

        if (modalBodyElement?.[0]) modalBodyElement?.[0]?.classList.add('scrollbar-hide');
    },[open]);

    const title = {
        'delete': 'Bạn có chắc chắn muốn xoá!!',
        'edit': 'Chỉnh sửa sản phẩm',
        'create': 'Tạo mới sản phẩm',
    }[type]

    const renderTab = {
        'delete': (
            <p>Vui lòng kiểm tra kỹ trước khi xác nhận xoá</p>
        ),
        'edit': (
            <div>heelo</div>
        ),
        'create': (
            <AddProduct />
        )
    }[type];

    const okText = {
        'delete': 'Xoá',
        'edit': 'Xác nhận',
        'create': 'Thêm mới',
    }[type]

    return (
        <Modal
            wrapClassName="modal-product"
            style={{
                height: '300px',

            }}
            rootClassName="root-product"
            title={title}
            open={open}
            onOk={onOk}
            okText={okText}
            okType={type === 'delete' ? 'danger' : 'primary'}
            cancelText={'Huỷ'}
            onCancel={onCancel}
        >
            {renderTab}
        </Modal>
    )
}

export default ModalProduct