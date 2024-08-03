import React from "react";

const PaymentMethod = (props) => {
    const { typePay, status } = props;

    const paymentMethdod = {
        0: "Nhận tiền khi giao hàng",
        1: "Thanh toán bằng momo"
    }[typePay]

    return (
        <div className=" border rounded-sm p-3">
            <div className=" text-center border-b-[1px] py-2  font-medium text-xl">
                Phương thức thanh toán
            </div>
            <div className="flex items-center justify-between">
                <div className=" font-medium">
                    {paymentMethdod}
                </div>
                {
                    (typePay === 0 && status === 4) &&
                    <div className=" text-green-500">
                        Đã nhận tiền
                    </div>
                }
                {
                    (typePay === 1 && status > 0 && status <= 4) &&
                    <div className=" text-green-500">
                        Đã thanh toán
                    </div>
                }

                {
                    (typePay === 1 && (status === 5 || status === 6)) &&
                    <div className=" text-green-500">
                        Đã hoàn tiền
                    </div>
                }

                {/* <div className=" text-green-500">
                    Đã chuyển tiền
                </div> */}
            </div>
        </div>
    )
}

export default PaymentMethod