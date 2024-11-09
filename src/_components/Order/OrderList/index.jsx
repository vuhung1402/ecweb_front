import React from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { formatCurrencyVN } from "@utils/function";
import { statusOrder } from "../../../pages/Order/mock";
import { TableWrapper } from "@pages/Order/Order";

const OrderList = (props) => {
    const { data } = props;

    const navigate = useNavigate();

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'Order_id',
            render: (_, record) => {
                return (
                    <div className=" hover:text-blue-500 cursor-pointer">
                        {record?.Order_id}
                    </div>
                )
            },
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'order_date',
            key: 'age',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price_pay',
            render: (_, record) => {
                return (
                    <div>{formatCurrencyVN(record?.price_pay)}</div>
                )
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (_, record) => {
                return (
                    <div>{statusOrder?.find((item) => item?.key === record?.status).name}</div>
                )
            },
        },
    ];

    const handleSelectRow = (order_id) => {
        navigate(`/orderDetail/${order_id}`);
    }

    return (
        <TableWrapper>
            <Table
                onRow={(record) => {
                    return {
                        onClick: () => handleSelectRow(record?.Order_id)
                    }
                }}
                dataSource={data}
                columns={columns}
                bordered
                pagination={{
                    hideOnSinglePage: true,
                    pageSize: 10
                }}
                className="font-bold"
            />
        </TableWrapper>
    )
}

export default OrderList