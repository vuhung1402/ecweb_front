import SildeBar from "@pages/profile/SildeBar";
import { Tabs } from "antd";
import React from "react";
import { items, statusOrder } from "./mock";
import OrderList from "./OrderList";

const Order = () => {
    return (
        <>
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
                    <div className=" w-3/4 p-5 h-[300px]">
                        <Tabs
                            items={statusOrder.map((item) => {
                                return {
                                    key: item?.key,
                                    label: item?.name,
                                    children: (
                                        <OrderList />
                                    )
                                }
                            })}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order