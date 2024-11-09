import Loading from "@component/Loading/Loading";
import React from "react";

const OrderContainer = (props) => {
    return (
        <div
            className=" w-full"
            style={{
                height: 'calc(100% - 80px)'
            }}
            {...props}
        />
    )
}

export default OrderContainer