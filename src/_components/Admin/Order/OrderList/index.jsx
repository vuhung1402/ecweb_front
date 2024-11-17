import { Button, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { formatCurrencyVN } from "@utils/function";
import './style.scss'
import Loading from "@widgets/Loading/Loading";
import { OrderListFilterWrapper, OrderListWrapper } from "@pages/admin/orders/Orders";
import OrderListFilter from "@_components/Admin/Order/OrderListFilter";

const OrderList = (props) => {
    const { orders, isLoadingList } = props;
    const { handleOrderDetail } = props;

    const [selectedRowKey, setSelectedRowKey] = useState(null); // Track selected row

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
            responsive: ['sm']
        },
        {
            title: 'Giá tiền',
            dataIndex: 'total_price',
            key: 'address',
            render: (_, record) => {
                return (
                    <div>{formatCurrencyVN(record?.price_pay)}</div>
                )
            },
            responsive: ['md']
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Space size="middle">
                        <Button
                            className="font-bold"
                            type="primary"
                            onClick={() => handleOrderDetail(record?.Order_id, record?.user_id)}
                        >
                            Chi Tiết
                        </Button>
                    </Space>
                )
            }
        },
    ];

    const onRowClick = (record) => {
        setSelectedRowKey(record.Order_id); // Set selected row key
    };

    const rowClassName = (record) => {
        return record.Order_id === selectedRowKey ? 'selected-row' : ''; // Highlight selected row
    };

    return (
        <OrderListWrapper>
            <OrderListFilterWrapper>
                <OrderListFilter/>
            </OrderListFilterWrapper>
            {
                isLoadingList ? <Loading /> :
                    <Table
                        rootClassName={`${orders?.length > 10 ? 'tableOrderWithPagination' : 'tableOrder'}`}
                        className="font-bold"
                        columns={columns}
                        dataSource={orders.map(order => ({ ...order, key: order.Order_id }))}
                        bordered
                        pagination={{
                            hideOnSinglePage: true,
                            pageSize: 10
                        }}
                        rowClassName={rowClassName} // Add rowClassName prop
                        onRow={(record) => ({
                            onClick: () => onRowClick(record), // Handle row click
                        })}
                    />
            }
        </OrderListWrapper>
    )
}

export default OrderList;