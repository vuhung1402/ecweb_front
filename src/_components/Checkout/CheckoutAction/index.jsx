import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const CheckoutAction = ({ isOrderLoading, onOrder }) => {

    const navigate = useNavigate()

    return (
        <div className=" flex items-center justify-between py-6">
            <div
                onClick={() => navigate('/cart')}
                className="text-blue-600 cursor-pointer font-medium hover:opacity-60 transition-opacity duration-300"
            >
                Giỏ hàng
            </div>
            <Button
                type="primary"
                className="uppercase p-3 font-bold !h-auto"
                loading={isOrderLoading}
                onClick={onOrder}
            >
                Hoàn tất đơn hàng
            </Button>
        </div>
    )
}

export default CheckoutAction