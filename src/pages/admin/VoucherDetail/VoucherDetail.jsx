import React from "react";

export const VoucherInforWrapper = (props) => {
    return (
        <div
            className="w-full flex flex-col gap-4"
            {...props}
        />
    )
}

export const InforDetailWrapper = (props) => {
    return (
        <div
            className="flex flex-col sm:flex-row gap-3 sm:items-center font-bold w-full"
            {...props}
        />
    )
}

