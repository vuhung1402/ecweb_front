import React, { useEffect, useState } from "react";
import { Tabs } from "antd";

import OrderList from "@_components/Admin/Order/OrderList";

import { statusOrder } from "./mock";
import OrdersContainer from "./OrdersContainer";

const Orders = (props) => {

    const { orders, isGetOrderList } = props;
    const { handleOrderDetail, handleChangeInfor } = props;


    const [state, setState] = useState({
        tab: 1,
        isLoadingList: false,
    })

    useEffect(() => {
        setState((prev) => ({ ...prev, isLoadingList: false }));
    }, [orders]);

    const onChangeTab = async (key) => {
        setState((prev) => ({ ...prev, tab: key, isLoadingList: true }));
        localStorage.setItem("orderTab", key);
        handleChangeInfor(`?status=${key}&type_sort=1`, 'query')
        setState((prev) => ({ ...prev, tab: key, isLoadingList: false }));
    }

    return (
        <OrdersContainer isGetOrderList={isGetOrderList}>
            <Tabs
                onChange={onChangeTab}
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
                            />
                        )
                    }
                })}
            />
        </OrdersContainer>
    )
}

export default Orders