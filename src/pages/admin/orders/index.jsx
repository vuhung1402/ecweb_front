import { Tabs } from "antd";
import React from "react";
import { statusOrder } from "./mock";
import OrderList from "@component/AdminUI/OrderList/";

const Orders = () => {
    return (
        <div className="w-full h-full p-4">
            <Tabs
                items={statusOrder.map((item) => {
                    return{
                        label: item?.name,
                        key: item?.key,
                        children:(
                            <OrderList/>
                        )
                    }
                })}
            />
        </div>
    )
}

export default Orders