import { SearchOutlined } from "@ant-design/icons";
import { optionSearchOrder, statusOrder } from "@pages/admin/orders/mock";
import { Button, Input, message, Popconfirm, Select, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { formatCurrencyVN, logAgain } from "@utils/function";
import { useNavigate } from "react-router-dom";
import { updateStatuOrder } from "@pages/admin/orders/function";
import { FAIL, SUCCESS } from "@utils/message";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import './style.scss'
import Loading from "@component/Loading/Loading";

const OrderList = (props) => {
    const { orders, tab, isLoadingList } = props;
    const { getData, handleOrderDetail } = props;

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
                    <div>{formatCurrencyVN(record?.price_pay)}</div>
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
                            className="font-bold"
                            type="primary"
                            onClick={() => handleOrderDetail(record?.Order_id, record?.user_id)}
                            // onClick={() => navigate(
                            //     {
                            //         pathname: `/admin/orderDetail/${record?.Order_id}`
                            //     },
                            //     {
                            //         state: {
                            //             user_id: record?.user_id,
                            //         }
                            //     }
                            // )}
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
                                        <Button danger={item.status === 5} className="font-bold">
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
            className=" w-full h-full flex flex-col gap-4 order-list"
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
                        className="font-bold"
                        placeholder={state.placeholder || 'Mã đơn hàng'}
                        prefix={<SearchOutlined />}
                    />
                </div>
                <Button
                    type="primary"
                    className="font-bold"
                >
                    Áp dụng
                </Button>
            </div>
            {
                isLoadingList ? <Loading /> :
                    <Table
                        rootClassName={`${orders.length > 10 ? 'tableOrderWithPagination' : 'tableOrder'}`}
                        className="font-bold"
                        columns={columns}
                        dataSource={orders}
                        bordered
                        pagination={{
                            hideOnSinglePage: true,
                            pageSize: 10
                        }}
                    />
            }
        </div>
    )
}

export default OrderList;