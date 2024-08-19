import React from "react";
import { Tag, Card } from "antd";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import LocationIcon from "@icon/locatioin.svg"
import { formatCurrencyVN } from "@utils/function";


const PaymentInfo = (props) => {

    const { address, totalPrice, name, phone, price_pay } = props;

    return (
        <div className="w-full flex flex-col gap-2">
            <Card
                title="Thông tin đơn hàng"
                classNames={{title: 'font-bold'}}
            >
                <div className="flex flex-col gap-1">
                    <div className="flex gap-3 text-sm font-bold">
                        <Tag color="cyan" className="w-7 h-5 flex items-center justify-center"><UserOutlined /></Tag>
                        <Tag color="blue">{name}</Tag>
                    </div>
                    <div className="w-full flex gap-3 text-sm font-bold">
                        <Tag color="cyan" className="w-7 h-5 flex items-center justify-center"><PhoneOutlined /></Tag>
                        <Tag color="blue">{phone}</Tag>
                    </div>
                    <div className="w-full flex gap-3 text-sm font-bold">
                        <Tag color="cyan" className="w-7 h-5 flex items-center justify-center"><LocationIcon className="w-4 h-4" /></Tag>
                        <Tag color="blue">{address}</Tag>
                    </div>
                </div>
            </Card>
            <Card
                classNames={{
                    body: 'flex flex-col gap-1'
                }}
            >
                <div className="w-full flex gap-3 items-center justify-between">
                    <Tag color="cyan" className="font-bold">Tổng tiền sản phẩm:</Tag>
                    <Tag color="#108ee9" className="font-bold text-sm">
                        {formatCurrencyVN(totalPrice)}
                    </Tag>
                </div>
                <div className="w-full flex gap-3 items-center justify-between">
                    <Tag color="cyan" className="font-medium">Giảm giá:</Tag>
                    <Tag color="#108ee9" className="font-bold text-sm">
                        {formatCurrencyVN(0)}
                    </Tag>
                </div>
                <div className="w-full flex gap-3 items-center justify-between">
                    <Tag color="cyan" className="font-medium">Phí vận chuyển:</Tag>
                    <Tag color="#109ee9" className="font-bold text-sm">
                        {formatCurrencyVN(0)}
                    </Tag>
                </div>
                <div className="w-full flex gap-3 items-center justify-between">
                    <Tag color="cyan" className="font-medium">Tổng tiền:</Tag>
                    <Tag color="#87d068" className="font-bold text-sm">
                        {formatCurrencyVN(price_pay)}
                    </Tag>
                </div>
            </Card>
        </div>
    )
}

export default PaymentInfo