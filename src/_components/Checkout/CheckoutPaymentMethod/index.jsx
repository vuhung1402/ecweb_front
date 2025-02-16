import React from "react";
import { Radio, Space } from "antd";

const payment = [
    {
        value: 0,
        name: 'Thanh toán khi giao hàng',
    },
    {
        value: 1,
        name: 'Thanh toán bằng momo',
    },
];

const CheckoutPaymentMethod = ({ paymentMethod, onSelectPaymentMethod }) => {
    return (
        <div className="w-full">
            <h1 className="text-lg py-4 font-medium tracking-wide">Phương thức thanh toán</h1>
            <Radio.Group
                className=" w-full"
                onChange={onSelectPaymentMethod}
                value={paymentMethod}
            >
                <Space
                    className=" w-full h-full"
                    direction="vertical"
                >
                    {
                        payment.map((item) => {
                            return (
                                <div class="flex items-center p-4 border rounded-sm w-full">
                                    <Radio
                                        className="w-full h-full font-medium"
                                        value={item?.value}
                                    >
                                        {item?.name}
                                    </Radio>
                                </div>
                            )
                        })
                    }
                </Space>
            </Radio.Group>
        </div>
    )
}

export default CheckoutPaymentMethod