import React from "react";
import { Card, Tag } from "antd";

const PaymentMethod = (props) => {
    const { typePay, status } = props;

    const paymentMethdod = {
        0: "Nhận tiền khi giao hàng",
        1: "Thanh toán bằng momo"
    }[typePay]

    return (
        <Card title="Phương thức thanh toán">
            <div className="flex items-center justify-between">
                <Tag color="#2db7f5" className="font-bold">
                    {paymentMethdod}
                </Tag>
                {
                    (typePay === 0 && status === 4) &&
                    <Tag color="#87d068" className="font-bold">
                        Đã nhận tiền
                    </Tag>
                }
                {
                    (typePay === 1 && status > 0 && status <= 4) &&
                    <Tag color="#87d068" className="font-bold">
                        Đã thanh toán
                    </Tag>
                }
                {
                    (typePay === 1 && (status === 5 || status === 6)) &&
                    <div color="#87d068" className="font-bold">
                        Đã hoàn tiền
                    </div>
                }

            </div>
        </Card>
    )
}

export default PaymentMethod