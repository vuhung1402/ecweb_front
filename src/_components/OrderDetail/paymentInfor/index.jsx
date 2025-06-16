import { WalletOutlined } from "@ant-design/icons";
import { formatCurrencyVN } from "@utils/function";
import React from "react";

const PaymentInfor = (props) => {
    const { data, status, shippingFee, typePay, price_pay } = props;

    return (
        <div className="w-full p-3">
            <div className="flex flex-col gap-3 py-3 text-sm border-b-[1px]">
                <div className="flex justify-between">
                    <div>Tổng tiền sản phẩm:</div>
                    <div className="font-bold text-sm">{formatCurrencyVN(data)}</div>
                </div>
                <div className="flex justify-between">
                    <div>Chi phí vận chuyển:</div>
                    <div className="font-bold text-sm">{formatCurrencyVN(shippingFee)}</div>
                </div>
            </div>
            <div className=" flex flex-col gap-3 pt-3">
                <div className=" flex justify-between">
                    <div>Thanh toán:</div>
                    <div className="font-bold text-sm text-red-500">{formatCurrencyVN(price_pay)}</div>
                </div>
                {
                    typePay === 1 && status !== 0 &&
                    <div className=" flex justify-between">
                        <div>Đã thanh toán:</div>
                        <div className="font-bold text-sm text-green-400">{formatCurrencyVN(price_pay)}</div>
                    </div>
                }

                {
                    typePay === 0 && status === 4 &&
                    <div className=" flex justify-between">
                        <div>Đã thanh toán:</div>
                        <div className="font-bold text-sm text-green-400">{formatCurrencyVN(price_pay)}</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default PaymentInfor;