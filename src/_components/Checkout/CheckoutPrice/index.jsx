import React from "react";

import useWindowSize from "@hooks/useWindowSize";
import { formatCurrencyVN } from "@utils/function";

const CheckoutPrice = React.memo(({ isCollapse, shippingFee, price }) => {

    const iw = useWindowSize().width

    return (
        <div className={`${iw < 960 ? isCollapse ? 'hidden' : 'flex' : 'flex'} py-3 border-b-[1px] flex-col gap-3`}>
            <div className=" flex items-center justify-between">
                <p>Phí vận chuyển</p>
                <p className=" font-bold">{formatCurrencyVN(shippingFee)}</p>
            </div>
            <div className=" flex items-center justify-between">
                <p>Tạm tính</p>
                <p className=" font-bold">{formatCurrencyVN(price)}</p>
            </div>
        </div>
    )
})

export default CheckoutPrice