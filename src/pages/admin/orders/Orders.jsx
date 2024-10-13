import React from "react";

export const OrderListWrapper = (props) => {
    return (
        <div
            className=" w-full h-full flex flex-col gap-4 order-list"
            style={{
                height: 'calc(100vh - 80px)'
            }}
            {...props}
        />
    )
}

export const OrderListFilterWrapper = (props) => {
    return(
        <div
            className="w-full flex flex-col sm:flex-row justify-end sm:items-center gap-3"
            {...props}
        />
    )
}