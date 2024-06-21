import React from "react";
import OrderCard from "../OrderCard";

const OrderList = () => {
    return(
        <div className="w-full p-2">
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
        </div>
    )
}

export default OrderList