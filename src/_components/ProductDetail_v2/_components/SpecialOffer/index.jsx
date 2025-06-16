import React from "react";
import { Card } from "antd";
import { Truck, RotateCcw, Shield, Award } from 'lucide-react'

const SpecialOffer = () => {
    const offer = [
        // { icon: Truck, text: "Miễn phí vận chuyển đơn từ 300k", color: "text-green-600" },
        { icon: RotateCcw, text: "Đổi trả trong 30 ngày", color: "text-blue-600" },
        { icon: Shield, text: "Bảo hành chất lượng 1 năm", color: "text-purple-600" },
        { icon: Award, text: "Chính hãng 100%", color: "text-orange-600" },
    ]

    return (
        <Card className="shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Ưu đãi đặc biệt</h3>

            {offer.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                </div>
            ))}
        </Card>
    )
}

export default SpecialOffer