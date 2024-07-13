import React from "react";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import LocationIcon from "@icon/locatioin.svg"
import { formatCurrencyVN } from "@utils/function";


const PaymentInfo = (props) => {
    const { address, totalPrice, name, phone, price_pay } = props;
    return (
        <div className=" w-full border rounded-md px-2 py-2 flex flex-col gap-2">
            <div className=" py-2 border-b-[1px] text-center font-medium">Thông tin đơn hàng</div>
            <div className=" w-full flex flex-col gap-2 border-b-[1px] py-2">
                <div className=" flex gap-3">
                    <div className=" font-medium"><UserOutlined /></div>
                    <div
                        className=" whitespace-normal break-words"
                        style={{
                            width: 'calc(100% - 120px)'
                        }}
                    >
                        {name}
                    </div>
                </div>
                <div className=" w-full flex gap-3 ">
                    <div className=" font-medium"><PhoneOutlined /></div>
                    <div
                        className=" whitespace-normal break-words"
                        style={{
                            width: 'calc(100% - 120px)'
                        }}
                    >
                        {phone}
                    </div>
                </div>
                <div className=" w-full flex gap-3 ">
                    <div className=" font-medium"><LocationIcon /></div>
                    <div
                        className=" whitespace-normal break-words"
                        style={{
                            width: 'calc(100% - 120px)'
                        }}
                    >
                        {address}
                    </div>
                </div>
            </div>
            <div className=" w-full flex flex-col gap-2">
                <div className=" w-full flex gap-3 items-center justify-between">
                    <div className=" font-medium">Tổng tiền sản phẩm:</div>
                    <div
                        className=" font-medium text-xl whitespace-normal break-words"
                        // style={{
                        //     width: 'calc(100% - 120px)'
                        // }}
                    >
                        {formatCurrencyVN(totalPrice)}
                    </div>
                </div>
                <div className=" w-full flex gap-3 items-center justify-between">
                    <div className=" font-medium">Giảm giá:</div>
                    <div
                        className=" font-medium text-xl whitespace-normal break-words"
                        // style={{
                        //     width: 'calc(100% - 120px)'
                        // }}
                    >
                        {formatCurrencyVN(0)}
                    </div>
                </div>
                <div className=" w-full flex gap-3 items-center justify-between">
                    <div className=" font-medium">Phí vận chuyển:</div>
                    <div
                        className=" font-medium text-xl whitespace-normal break-words"
                        // style={{
                        //     width: 'calc(100% - 120px)'
                        // }}
                    >
                        {formatCurrencyVN(0)}
                    </div>
                </div>
                <div className=" w-full flex gap-3 items-center justify-between">
                    <div className=" font-medium">Tổng tiền:</div>
                    <div
                        className=" font-medium text-xl text-green-500 whitespace-normal break-words"
                        // style={{
                        //     width: 'calc(100% - 120px)'
                        // }}
                    >
                        {formatCurrencyVN(price_pay)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentInfo