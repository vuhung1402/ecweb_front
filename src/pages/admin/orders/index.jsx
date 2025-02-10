import React, { useState } from "react";
import { Tabs } from "antd";

import OrderList from "@_components/Admin/Order/OrderList";

import { statusOrder } from "@constants/index";
import OrdersContainer from "./OrdersContainer";
import { query } from "firebase/database";

const Orders = (props) => {

    const { orders, isGetOrderList } = props;
    const { handleOrderDetail, handleChangeInfor } = props;


    const [state, setState] = useState({
        tab: 1,
        query: '?status=1&type_sort=1',
    })


    const handleChangeTab = async (key) => {
        setState((prev) => ({ ...prev, tab: key, query: `?status=${key}&type_sort=1`}));
        localStorage.setItem("orderTab", key);
        handleChangeInfor(`?status=${key}&type_sort=1`, 'query')
    }

    return (
        <OrdersContainer>
            <Tabs
                onChange={handleChangeTab}
                rootClassName="!w-full !max-w-full"
                className="!w-full !max-w-full"
                activeKey={state.tab}
                items={statusOrder.map((item) => {
                    return {
                        label: item?.name,
                        key: item?.status,
                        children: (
                            <OrderList
                                orders={orders}
                                isLoadingList={isGetOrderList}
                                handleOrderDetail={handleOrderDetail}
                                handleChangeInfor={handleChangeInfor}
                                query={state.query}
                            />
                        )
                    }
                })}
            />
        </OrdersContainer>
    )
}

export default Orders