import React from "react";

import Loading from "@widgets/Loading/Loading";

export const CheckoutContainer = ({ children, isLoading }) => {

    if (isLoading) return <Loading />

    return (
        <div className="w-full flex flex-col-reverse me:flex-row p-3 checkout-page me:h-full">
            {children}
        </div>
    )
}

export const CheckoutAddress = ({children}) => {

    return (
        <div className="w-full mx-auto max-w-[640px] me:max-w-none me:mx-0 me:w-2/3 p-5 me:border-r-[1px]">
            {children}
        </div>
    )
}