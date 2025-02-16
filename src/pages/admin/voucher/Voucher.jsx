import useWindowSize from "@hooks/useWindowSize";
import React from "react";

export const VoucherListWrapper = (props) => {
    const iw = useWindowSize().width;

    return (
        <div
            style={{
                height: iw > 640 ? 'calc(100vh - 120px)' : 'calc(100vh - 230px)'
            }}
            {...props}
        >

        </div>
    )
}

export const ActionWrraper = (props) => {
    return (
        <div
            className='flex flex-col 2xl:flex-row gap-3 items-center justify-end 2xl:justify-between mb-3 px-2'
            {...props}
        />
    )
}