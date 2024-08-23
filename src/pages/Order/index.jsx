import React, { useState } from "react";
import { Tabs, message } from "antd";
import { useNavigate } from "react-router-dom";

import SideBar from "@pages/Profile/SideBar";
import Loading from "@component/Loading/Loading";
import OrderList from "./OrderList";

import { statusOrder } from "./mock";
import { getOrderList } from "./function";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { logAgain } from "@utils/function";
import { FAIL } from "@utils/message";

const Order = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        data: undefined,
        tabKey: 0,
    });

    const getData = async (query) => {
        const result = await getOrderList(query);
        if(result?.success){
            setState((prev) => ({...prev, data: result?.format_order_list}))
        } else {
            if(result?.message === TOKEN_INVALID && result?.message === NOT_AUTHENTICATION){
                logAgain();
                navigate('/login');
            } else {
                message.error(FAIL);
            };
        };
    };

    useState(() => {
        getData(`?status=0`);
    }, []);

    const handleChangeTab = async (key) => {
        setState((prev) => ({...prev, data: undefined, tabKey: key}));
        await getData(`?status=${key}`);
    };

    return (
        <>
            {
                state?.data === undefined ? <Loading />
                    :
                    <div
                        className=" w-full"
                        style={{
                            height: 'calc(100% - 80px)'
                        }}
                    >
                        <div className=" flex flex-col items-center justify-center font-semibold text-5xl gap-3 p-5 border-b-[1px]">
                            <h1>Lịch sử mua hàng</h1>
                            <span className="bg-black p-[1.5px] w-14 flex items-center justify-center"></span>
                        </div>
                        <div className="flex flex-col md:flex-row w-full md:w-[750px] me:w-[970px] xl:w-[1170px] mx-auto">
                            <div className="md:w-1/4 px-5 md:px-0">
                                <SideBar />
                            </div>
                            <div className="w-full md:w-3/4 px-5 md:px-0 h-full">
                                <Tabs
                                    onChange={handleChangeTab}
                                    activeKey={state.tabKey}
                                    className="font-bold"
                                    items={statusOrder.map((item) => {
                                        return {
                                            key: item?.key,
                                            label: item?.name,
                                            children: (
                                                <OrderList data={state.data} />
                                            )
                                        }
                                    })}
                                />
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default Order;