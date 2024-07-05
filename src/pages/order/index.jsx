import SildeBar from "@pages/profile/SildeBar";
import { Tabs, message } from "antd";
import React, { useState } from "react";
import { items, statusOrder } from "./mock";
import OrderList from "./OrderList";
import { data } from "@pages/admin/user/mock";
import Loading from "@component/Loading/Loading";
import { getOrderList } from "./function";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { logAgain } from "@utils/function";
import { useNavigate } from "react-router-dom";
import { FAIL } from "@utils/message";

const Order = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        data: undefined,
    })

    const getData = async () => {
        const result = await getOrderList();
        if(result?.success){
            setState((prev) => ({...prev, data: result?.format_order_list}))
        }else{
            if(result?.message === TOKEN_INVALID && result?.message === NOT_AUTHENTICATION){
                logAgain();
                navigate('/login');
            }else{
                message.error(FAIL);
            }
        }
    }

    useState(() => {
        getData();
    }, [])


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
                        {/* <div className=" flex flex-col items-center justify-center font-semibold text-5xl gap-3 p-5 border-b-[1px]">
                        <h1>Lịch sử mua hàng</h1>
                        <span className="bg-black p-[1.5px] w-14 flex items-center justify-center"></span>
                        </div> */}
                        <div className=" flex">
                            <SildeBar />
                            <div className=" w-3/4 h-full">
                                <Tabs
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
    )
}

export default Order