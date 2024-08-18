import React from "react";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import LocationIcon from "@icon/locatioin.svg"
import { formatCurrencyVN } from "@utils/function";


const PaymentInfo = (props) => {
    const { address, totalPrice, name, phone, price_pay } = props;
    return (
        <div className=" w-full border rounded-md px-2 py-2 flex flex-col gap-2">
            <div className="py-2 border-b-[1px] text-center font-bold">Thông tin đơn hàng</div>
            <div className=" w-full flex flex-col gap-2 border-b-[1px] py-2">
                <div className="flex gap-3 text-sm font-bold">
                    <div className="w-5 h-5"><UserOutlined /></div>
                    <div>{name}</div>
                </div>
                <div className="w-full flex gap-3 text-sm font-bold">
                    <div className="w-5 h-5"><PhoneOutlined /></div>
                    <div>{phone}</div>
                </div>
                <div className="w-full flex gap-3 text-sm font-bold">
                    <div className="w-5 h-5"><LocationIcon /></div>
                    <div>{address}</div>
                </div>
            </div>
            <div className=" w-full flex flex-col gap-2">
                <div className="w-full flex gap-3 items-center justify-between">
                    <div className="font-bold">Tổng tiền sản phẩm:</div>
                    <div className="font-bold">
                        {formatCurrencyVN(totalPrice)}
                    </div>
                </div>
                <div className="w-full flex gap-3 items-center justify-between">
                    <div className="font-medium">Giảm giá:</div>
                    <div className="font-medium">
                        {formatCurrencyVN(0)}
                    </div>
                </div>
                <div className="w-full flex gap-3 items-center justify-between">
                    <div className="font-medium">Phí vận chuyển:</div>
                    <div className="font-medium">
                        {formatCurrencyVN(0)}
                    </div>
                </div>
                <div className="w-full flex gap-3 items-center justify-between">
                    <div className="font-medium">Tổng tiền:</div>
                    <div className="font-medium text-green-500">
                        {formatCurrencyVN(price_pay)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentInfo