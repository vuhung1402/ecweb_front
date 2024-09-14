import React, { useEffect, useState } from "react";
import { Tabs } from "antd";

import OrderList from "@component/AdminUI/OrderList/";
import Loading from "@component/Loading/Loading";

import { statusOrder } from "./mock";

const Orders = (props) => {

    const { orders } = props;
    const { handleOrderDetail, getDataOrder } = props;


    const [state, setState] = useState({
        tab: 0,
        isLoadingList: false,
    })

    useEffect(() => {
        getDataOrder(`?status=0`);
    }, []);

    useEffect(() => {
        setState((prev) => ({ ...prev, isLoadingList: false }));
    }, [orders]);

    const onChangeTab = async (key) => {
        setState((prev) => ({ ...prev, tab: key, isLoadingList: true }));
        localStorage.setItem("orderTab", key);
        await getDataOrder(`?status=${key}`);
        setState((prev) => ({ ...prev, tab: key, isLoadingList: false }));
    }

    return (
        <>
            {
                orders === undefined ? <Loading />
                    :
                    <div className="w-full h-full p-4">
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
                                            tab={state?.tab}
                                            isLoadingList={state.isLoadingList}
                                            getData={getDataOrder}
                                            handleOrderDetail={handleOrderDetail}
                                        />
                                    )
                                }
                            })}
                        />
                    </div>
            }
        </>
    )
}

export default Orders