import { formatCurrencyVN } from "@utils/function";
import { Button } from "antd";
import React from "react";

const OrderCard = () => {
    return (
        <div className="w-full mt-2 rounded-lg p-3 border flex gap-3">
            <div className="w-[110px] h-[110px]">
                <img src="https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/images%2Frc-upload-1717084950125-3?alt=media&token=2d8fc153-9580-45c0-94d9-8032c7ef35a8" />
            </div>
            <div className="flex-1">
                <div className=" flex justify-between">
                    <div className=" font-medium">FEARLESS corduroy varsity jacket</div>
                    <div>17/06/2024</div>
                </div>
                <div className=" font-medium">Nâu / XL</div>
                <div className=" text-green-600 font-bold">Đã giao hàng</div>
                <div className=" text-red-500 font-medium text-lg">{formatCurrencyVN(233000)}</div>
                <div className="flex justify-end">
                    <Button danger>Xem chi tiết</Button>
                </div>
            </div>
        </div>
    )
}

export default OrderCard