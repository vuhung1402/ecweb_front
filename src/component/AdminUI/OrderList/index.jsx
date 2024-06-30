import { SearchOutlined } from "@ant-design/icons";
import { optionSearchOrder, statusOrder } from "@pages/admin/orders/mock";
import { Button, Input, Select, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import CardOrder from "./CardOrder";
import OrderDetail from "./OrderDetail";
import { formatCurrencyVN } from "@utils/function";
import { status } from "@api/api";

const OrderList = () => {
    const [state, setState] = useState({
        placeholder: '',
        selectValue: '1',
        isDetaile: false,
        codeOrder: '',
    })

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'Order_id',
            key: 'name',
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'order_date',
            key: 'age',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'total_price',
            key: 'address',
            render: (_, record) => {
                return (
                    <div>{formatCurrencyVN(record?.total_price)}</div>
                )
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (_, record) => {
                return (
                    <div>{statusOrder.find((item) => item?.status === record.status).name}</div>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                const findStatus = statusOrder.find((item) => item?.status === record?.status)
                return (
                    <Space size="middle">
                        <Button>Chi Tiết</Button>
                        {
                            findStatus?.nextStatus?.map((item) => {
                                return (
                                    <Button>{item?.label}</Button>
                                )
                            })
                        }
                    </Space>
                )
            }
        },
    ];
    const data = [
        {
            key: '1',
            Order_id: '112',
            order_date: '15/06/2024',
            total_price: 200000,
            status: 3,
        },
    ];

    const handleSelect = (value, option) => {
        state.selectValue = value;
        state.placeholder = option.label;
        setState(prev => ({ ...prev }));
    }

    //truyenf param code order xuong va gan cho state.codeOrder
    const handleDetail = () => {
        state.isDetaile = !state.isDetaile;
        // state.codeOrder = '';
        setState(prev => ({ ...prev }));
    }

    return (
        <div
            className=" w-full flex flex-col gap-4"
        >
            <div className="w-full flex justify-end items-center gap-3">
                <div className=" flex gap-2">
                    <Select
                        style={{
                            width: 200,
                        }}
                        value={state.selectValue}
                        onSelect={handleSelect}
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={optionSearchOrder}
                    />
                    <Input
                        placeholder={state.placeholder || 'Mã đơn hàng'} prefix={<SearchOutlined />}
                    />
                </div>
                <Button type="primary">Áp dụng</Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    hideOnSinglePage: true,
                    pageSize: 30
                }}
            />
        </div>
    )
}

export default OrderList;