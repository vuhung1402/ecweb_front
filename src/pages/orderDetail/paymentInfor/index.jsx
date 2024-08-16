import { WalletOutlined } from "@ant-design/icons";
import { formatCurrencyVN } from "@utils/function";
import React from "react";

const PaymentInfor = (props) => {
    const { data } = props;

    return (
        <div className="w-full p-4 border rounded-lg mb-3">
            <div className="font-bold text-2xl">
                Thông tin thanh toán
            </div>
            <div>
                <div className="flex flex-col gap-3 py-3  border-b-[1px]">
                    <div className="flex justify-between">
                        <div>Tổng tiền sản phẩm:</div>
                        <div className="font-bold text-lg">{formatCurrencyVN(data)}</div>
                    </div>
                </div>
                <div className=" flex flex-col gap-3 pt-3">
                    <div className=" flex justify-between">
                        <div>Phải thanh toán:</div>
                        <div className="font-bold text-lg">{formatCurrencyVN(data)}</div>
                    </div>
                    <div className=" flex justify-between">
                        <div>Đã thanh toán:</div>
                        <div className="font-bold text-lg text-green-400">{formatCurrencyVN(data)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentInfor;