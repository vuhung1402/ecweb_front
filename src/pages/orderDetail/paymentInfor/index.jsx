import { WalletOutlined } from "@ant-design/icons";
import React from "react";

const PaymentInfor = () => {
    return (
        <div className=" w-full p-4 border rounded-lg">
            <div className=" font-medium text-2xl">
                Thông tin thanh toán
            </div>
            <div>
                <div className=" flex flex-col gap-3 py-3  border-b-[1px]">
                    <div className=" flex justify-between">
                        <div>Tổng tiền sản phẩm:</div>
                        <div>269.000đ</div>
                    </div>
                    <div className=" flex justify-between">
                        <div>Giảm giá:</div>
                        <div>-36.000đ</div>
                    </div>
                    <div className=" flex justify-between">
                        <div>Phí vận chuyển:</div>
                        <div>15.000đ</div>
                    </div>
                </div>
                <div className=" flex flex-col gap-3">
                    <div className=" flex justify-between">
                        <div>Phải thanh toán:</div>
                        <div className="font-medium">248.000đ</div>
                    </div>
                    <div className=" flex justify-between">
                        <div>Đã thanh toán:</div>
                        <div className=" font-medium text-green-400">248.000đ</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentInfor;