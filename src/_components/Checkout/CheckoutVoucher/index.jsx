import { Button, Input } from "antd";
import React from "react";

const CheckoutVoucher = () => {
    return (
        <div className="flex items-center gap-4 border-b-[1px] py-2">
            <Input
                placeholder="Mã giảm giá"
                type=""
                className="outline-none border rounded-lg w-2/3"
            />
            <Button
                type="primary"
                className="w-1/3 font-medium rounded-lg text-sm"
            >
                Sử dụng
            </Button>
        </div>
    )
}

export default CheckoutVoucher