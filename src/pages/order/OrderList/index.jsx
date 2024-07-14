import React from "react";
import OrderCard from "../OrderCard";
import { Button, Image, Space, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { formatCurrencyVN } from "@utils/function";
import { statusOrder } from "../mock";

const OrderList = (props) => {
    const { data } = props;

    const navigate = useNavigate();

    // const dataSource = [
    //     {
    //         order_id: '111',
    //         order_date: '30/06/2024',
    //         totalPrice: 10000,
    //         status: 1,
    //     },
    //     {
    //         order_id: '112',
    //         order_date: '30/06/2024',
    //         totalPrice: 10000,
    //         status: 1,
    //     },
    //     {
    //         order_id: '113',
    //         order_date: '30/06/2024',
    //         totalPrice: 10000,
    //         status: 1,
    //     },
    // ];

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'Order_id',
            render: (_, record) => {
                return (
                    <div className=" hover:text-blue-500 cursor-pointer text-xl">
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
        <div className="w-full overflow-y-auto h-[400px]">
            {/* <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/> */}
            <Table
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => handleSelectRow(record?.Order_id)
                    }
                }}
                dataSource={data}
                columns={columns}
                pagination={{
                    hideOnSinglePage: true,
                    pageSize: 10
                }} 
            />
        </div>
    )
}

export default OrderList