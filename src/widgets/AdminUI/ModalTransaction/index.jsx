import { Modal, Table } from "antd";
import React from "react";

const ModalTransaction = (props) => {
    const { isOpenModalTransaction } = props;
    const { handleOpenModalTransaction } = props;

    const data = [
        {
            "_id": {
                "$oid": "6693a0707126b467538b5781"
            },
            "order_id": "xgv5vz2fg7",
            "price_pay": 250000,
            "user_id": "6663cb79e12e5a5b69c7fb01",
            "email": "dinhquanfananime@gmail.com",
            "create_date": {
                "$date": "2024-07-14T09:54:56.290Z"
            },
            "__v": 0
        },
        {
            "_id": {
                "$oid": "6693e4c6a1e3c6ac832a7142"
            },
            "order_id": "h489w8qzyj",
            "price_pay": 220000,
            "user_id": "6663cb79e12e5a5b69c7fb01",
            "email": "dinhquanfananime@gmail.com",
            "create_date": {
                "$date": "2024-07-14T14:46:30.577Z"
            },
            "__v": 0
        },
    ]

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'order_id',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'name',
        },
        {
            title: 'Số tài khoản',
            dataIndex: 'price_pay',
            key: 'name',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price_pay',
            key: 'name',
        },
    ]

    return (
        <Modal
            title="Lịch sử giao dịch"
            open={isOpenModalTransaction}
            onCancel={handleOpenModalTransaction}
            width={800}
            okButtonProps={{
                style: {
                    display: 'none'
                }
            }}
        >
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    hideOnSinglePage: true,
                    pageSize: 15,
                }}
            />
        </Modal>
    )
}

export default ModalTransaction