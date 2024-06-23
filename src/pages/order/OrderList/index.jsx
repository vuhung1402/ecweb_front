import React from "react";
import OrderCard from "../OrderCard";

const OrderList = () => {
    return(
        <div className="w-full p-2 overflow-y-auto h-[350px]">
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
        </div>
    )
}

export default OrderList