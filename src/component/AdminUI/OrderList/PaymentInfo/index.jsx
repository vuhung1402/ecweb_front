import React from "react";

const PaymentInfo = () => {
    return (
        <div className=" border rounded-md px-2 py-2 flex flex-col gap-2">
            <div className=" py-2 border-b-[1px] text-center font-medium">Thông tin đơn hàng</div>
            <div className=" w-full flex flex-col gap-2 border-b-[1px] py-2">
                <div className=" flex ">
                    <div className="w-[120px] font-medium">Tên:</div>
                    <div
                        className=" whitespace-normal break-words"
                        style={{
                            width: 'calc(100% - 120px)'
                        }}
                    >
                        123
                    </div>
                </div>
                <div className=" w-full flex ">
                    <div className="w-[120px] font-medium">Địa chỉ:</div>
                    <div
                        className=" whitespace-normal break-words"
                        style={{
                            width: 'calc(100% - 120px)'
                        }}
                    >
                        1231312312312312312312313131312313123
                    </div>
                </div>
                <div className=" w-full flex ">
                    <div className="w-[120px] font-medium">Số điện thoại:</div>
                    <div
                        className=" whitespace-normal break-words"
                        style={{
                            width: 'calc(100% - 120px)'
                        }}
                    >
                        123
                    </div>
                </div>
            </div>
            <div className=" w-full flex ">
                <div className="w-[120px] font-medium text-2xl">Tổng tiền:</div>
                <div
                    className=" font-medium text-red-600 text-2xl whitespace-normal break-words"
                    style={{
                        width: 'calc(100% - 120px)'
                    }}
                >
                    123
                </div>
            </div>
        </div>
    )
}

export default PaymentInfo