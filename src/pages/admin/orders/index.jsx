import { Tabs, message } from "antd";
import React, { useEffect, useState } from "react";
import { statusOrder } from "./mock";
import OrderList from "@component/AdminUI/OrderList/";
import { data } from "../user/mock";
import { getOrderList } from "./function";
import { useNavigate } from "react-router-dom";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { logAgain } from "@utils/function";
import { FAIL } from "@utils/message";
import Loading from "@component/Loading/Loading";

const Orders = () => {
    const [state, setState] = useState({
        data: undefined,
        tab: 0,
        isLoadingList: false,
    })
    const navigate = useNavigate();

    const getData = async (query) => {
        const respose = await getOrderList(query);
        if (respose?.success) {
            setState((prev) => ({ ...prev, data: respose?.formatted_Order_table }));
        } else {
            if (respose?.message === TOKEN_INVALID || respose?.message === NOT_AUTHENTICATION) {
                logAgain();
                navigate('/login');
            } else {
                message.error(FAIL);
            }
        }
    }

    useEffect(() => {
        getData(`?status=0`);
    }, [])

    const onChangeTab = async (key) => {
        setState((prev) => ({ ...prev, tab: key, isLoadingList: true }));
        localStorage.setItem("orderTab", key);
        await getData(`?status=${key}`);
        setState((prev) => ({ ...prev, tab: key, isLoadingList: false }));
    }

    return (
        <>
            {
                state.data === undefined ? <Loading />
                    :
                    <div className="w-full h-full p-4">
                        <Tabs
                            onChange={onChangeTab}
                            activeKey={state.tab}
                            items={statusOrder.map((item) => {
                                return {
                                    label: item?.name,
                                    key: item?.status,
                                    children: (
                                        <OrderList
                                            orders={state.data}
                                            tab={state?.tab}
                                            isLoadingList={state.isLoadingList}
                                            getData={getData}
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