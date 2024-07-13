import { SearchOutlined } from "@ant-design/icons";
import { optionSearchOrder, statusOrder } from "@pages/admin/orders/mock";
import { Button, Input, message, Popconfirm, Select, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import CardOrder from "./CardOrder";
import OrderDetail from "../../../pages/admin/OrderDetail";
import { formatCurrencyVN, logAgain } from "@utils/function";
import { status } from "@api/api";
import { useNavigate } from "react-router-dom";
import { updateStatuOrder } from "@pages/admin/orders/function";
import { FAIL, SUCCESS } from "@utils/message";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import './style.scss'

const OrderList = (props) => {
    const { orders, tab } = props;
    const { getData } = props;

    const [state, setState] = useState({
        placeholder: '',
        selectValue: '1',
        isDetaile: false,
        codeOrder: '',
        isConfirmLoading: false,
    })

    const navigate = useNavigate();

    const updateStatus = async (user_id, Order_id, new_status_order) => {
        setState((prev => ({
            ...prev,
            isConfirmLoading: true,
        })));
        const response = await updateStatuOrder(user_id, Order_id, new_status_order);
        if (response?.success) {
            await getData(`?status=${tab}`);
            setState((prev) => ({ ...prev, isConfirmLoading: false }))
            message.success(SUCCESS);
        } else {
            if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                logAgain();
                navigate('/login');
            } else {
                setState((prev) => ({ ...prev, isConfirmLoading: false }))
                message.success(FAIL);
            }
        }
    }

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
                        <Button
                            onClick={() => navigate(
                                {
                                    pathname : `/admin/orderDetail/${record?.Order_id}`
                                },
                                {
                                    state:{
                                        user_id: record?.user_id,
                                    }
                                }
                            )}
                        >
                            Chi Tiết
                        </Button>
                        {
                            findStatus?.nextStatus?.map((item) => {
                                return (
                                    <Popconfirm
                                        title="Đổi trạng thái"
                                        description="Bạn muốn đổi trạng thái của đơn hàng?"
                                        cancelText="Huỷ"
                                        okText="Xác nhận"
                                        onConfirm={() => updateStatus(record?.user_id, record?.Order_id, item?.status)}
                                        okButtonProps={{
                                            loading: state?.isConfirmLoading,
                                        }}
                                    >
                                        <Button>
                                            {item?.label}
                                        </Button>
                                    </Popconfirm>
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
            className=" w-full h-full flex flex-col gap-4"
            style={{
                height: 'calc(100vh - 80px)'
            }}
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
                rootClassName={`${orders.length > 13 ? 'tableOrderWithPagination' : 'tableOrder'}`}
                // className="flex-grow"
                columns={columns}
                // sticky={true}
                dataSource={orders}
                pagination={{
                    hideOnSinglePage: true,
                    pageSize: 13
                }}
            />
        </div>
    )
}

export default OrderList;