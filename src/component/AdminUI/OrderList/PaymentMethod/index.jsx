import React from "react";

const PaymentMethod = () => {
    return (
        <div className=" border rounded-sm p-3">
            <div className=" text-center border-b-[1px] py-2  font-medium text-xl">
                Phương thức thanh toán
            </div>
            <div className="flex items-center justify-between">
                <div className=" font-medium">
                    Chuyển khoản ngân hàng
                </div>
                <div className=" text-green-500">
                    Đã chuyển tiền
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod