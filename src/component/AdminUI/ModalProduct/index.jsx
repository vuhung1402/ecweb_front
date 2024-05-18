import { Modal } from "antd";
import React, { useEffect } from "react";
import AddProduct from "../AddProduct";
import "./style.scss"

const ModalProduct = (props) => {

    const { open, type } = props
    const { onOk, onCancel } = props

    useEffect(() => {
        const element = document.getElementById('ant-modal-wrap');
        console.log("element: ", element);
        if (element) {
            const divsWithTabIndex = element.querySelectorAll('div[tab-index="-1"]');
            console.log(divsWithTabIndex);
        }
    }, []);

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