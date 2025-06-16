import React from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { formatCurrencyVN } from "@utils/function";
import { statusOrder } from "../../../pages/Order/mock";
import { TableWrapper } from "@pages/Order/Order";
import Search from "antd/es/input/Search";

const OrderList = (props) => {
    const { data, onChange, onSearch, name } = props;

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
            title: 'Mã đơn hàng',
            dataIndex: 'Order_id',
            render: (_, record) => {
                return (
                    <div className="">
                        {
                            record?.items?.map(item => {
                                return (
                                    <div className=" flex gap-2 justify-center items-center pb-2">
                                        <div><img className="h-[50px] w-[50px]" src={item?.image_hover} /></div>
                                        <div>{item?.product_name}</div>
                                        <div>{item?.quantity}</div>
                                        <div>{item?.color}/{item?.size}</div>
                                    </div>
                                )
                            })
                        }
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
            <Search
                value={name}
                size='large'
                allowClear
                placeholder="Tìm kiếm theo mã đơn hàng hoặc tên sản phẩm"
                onSearch={onSearch}
                onChange={(e) => onChange(e.target.value)}
                enterButton
                className='w-full'
            />
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