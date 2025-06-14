import useWindowSize from "@hooks/useWindowSize";
import React from "react";

export const OrderListWrapper = (props) => {

    const iw = useWindowSize().width;

    return (
        <div
            className=" w-full h-full flex flex-col gap-4 order-list"
            style={{
                height: iw > 640 ? 'calc(100vh - 120px)' : 'calc(100vh - 230px)'
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