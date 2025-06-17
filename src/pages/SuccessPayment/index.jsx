import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
    const navigate = useNavigate();

    const hanldeOnclick = () => {
        navigate("/order");
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Result
                status="success"
                className="font-bold"
                subTitle="Thanh toán đơn hàng thành công"
                extra={
                    <Button className="font-bold" onClick={hanldeOnclick} type="primary">
                        Back Home
                    </Button>
                }
            />
        </div>
    );
};

export default SuccessPayment