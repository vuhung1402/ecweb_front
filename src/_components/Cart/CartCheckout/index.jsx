import React from "react";
import { Button } from "antd";

import { formatCurrencyVN } from "@utils/function";

import IconBackCheckout from '@icon/iconBackCheckout.svg';

const CartCheckout = (props) => {

    const { isLoadingCheckout, totalPrice } = props;
    const { handleCheckout } = props;

    return (
        <div className="w-full md:w-1/3 md:pl-4 md:sticky">
            <div className="w-full p-5 border">
                <h1 className="border-b-[1px] text-xl font-bold pb-5 tracking-wide opacity-90">Thông tin đơn hàng</h1>
                <div className="flex items-center justify-between border-b-[1px] py-3">
                    <p className="font-bold opacity-80">Tổng tiền:</p>
                    <p className="text-red-600 text-xl font-bold">{formatCurrencyVN(totalPrice)}</p>
                </div>
                <div className="text-sm py-3 font-semibold opacity-70">
                    Phí vận chuyển sẽ được tính ở trang thanh toán.
                    Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                </div>
                <Button
                    onClick={() => handleCheckout("checkOut")}
                    loading={isLoadingCheckout.status && "checkOut" === isLoadingCheckout.type}
                    className="w-full mt-3 p-3 !h-auto font-medium uppercase text-xl"
                    type="primary"
                >
                    Thanh toán
                </Button>
                <div className="flex text-sm items-center justify-center gap-1 text-blue-600 py-3">
                    <IconBackCheckout />
                    <div
                        className="cursor-pointer flex items-center"
                        onClick={() => navigate("/products/all")}
                    >
                        Tiếp tục mua hàng
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartCheckout;