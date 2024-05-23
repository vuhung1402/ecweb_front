import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import AddProduct from "../AddProduct";
import { uuid } from "@utils/function";

import "./style.scss"

const ModalProduct = (props) => {

    const { open, type } = props
    const { handleCloseModalProduct } = props

    const [state, setState] = useState({
        color: [],
    });

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
    }[type];

    const handleAddColor = () => {
        const { color } = state;

        const newColor = {
            _id: uuid(),
            code_color: '#000000',
            name_color: 'Đen',
            size: [],
        };

        const updateColor = color;
        updateColor.push(newColor);

        const element = document.getElementById('color-info');
        if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'end'})
        }

        state.color = updateColor;
        setState(prev => ({...prev}));
    };

    const handleDeleteColor = (id) => {
        const { color } = state;

        const updateColor = [...color];

        const result = updateColor.filter((item) => item?._id !== id);

        state.color = result;
        setState((prev) => ({...prev}))
    }

    const handleAddSize = (colorUuid) => {
        const { color } = state;

        const newSize = {
            _id: uuid(),
            name_size: '',
            total_number_with_size: 0,
        };

        const updateColor = [...color];

        updateColor.map((item) => {
            if (item?._id === colorUuid) {
                const updateSize = item?.size;
                return {
                    ...item,
                    size: updateSize?.push(newSize),
                };
            };

            return item;
        });

        state.color = updateColor;
        setState(prev => ({...prev}));
    };

    const handleDeleteSize = (id, idSize) => {
        const { color } = state;

        const updateColor = [...color];

        const result = updateColor.map((item, index) => {
            if (item?._id === id) {
                const updateSize = [...item?.size]
                return {
                    ...item,
                    size: updateSize?.filter((itemSize) => itemSize?._id !== idSize),
                };
            };
            return item;
        });

        console.log("result: ", result);
        setState(prev => ({...prev, color: result}));
    }

    const renderTab = {
        'delete': (
            <p>Vui lòng kiểm tra kỹ trước khi xác nhận xoá</p>
        ),
        'edit': (
            <div>heelo</div>
        ),
        'create': (
            <AddProduct
                color={state.color}
                handleAddColor={handleAddColor}
                handleAddSize={handleAddSize}
                handleDeleteColor = {handleDeleteColor}
                handleDeleteSize = {handleDeleteSize}
            />
        )
    }[type];

    const okText = {
        'delete': 'Xoá',
        'edit': 'Xác nhận',
        'create': 'Thêm mới',
    }[type];

    return (
        <Modal
            wrapClassName="modal-product"
            rootClassName="root-product"
            title={title}
            open={open}
            // onOk={onOk}
            okText={okText}
            okType={type === 'delete' ? 'danger' : 'primary'}
            cancelText={'Huỷ'}
            onCancel={handleCloseModalProduct}
        >
            {renderTab}
        </Modal>
    )
}

export default ModalProduct