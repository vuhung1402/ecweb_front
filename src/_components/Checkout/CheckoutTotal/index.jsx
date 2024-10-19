import React from "react";

import useWindowSize from "@hooks/useWindowSize";
import { formatCurrencyVN } from "@utils/function";

const CheckoutTotal = React.memo(({ isCollapse, price, shippingFee }) => {

    const iw = useWindowSize().width

    return (
        <div className={`${iw < 960 ? isCollapse ? 'hidden' : 'flex' : 'flex'} items-center justify-between py-3`}>
            <p className=" text-lg">Tổng cộng</p>
            <p className=" text-2xl font-bold text-red-500">{formatCurrencyVN(price + shippingFee)}</p>
        </div>
    )
})

export default CheckoutTotal