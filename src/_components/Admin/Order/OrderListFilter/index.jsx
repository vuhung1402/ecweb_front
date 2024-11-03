import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React from "react";

const OrderListFilter = (props) => {
    return (
        <div className=" flex gap-2">
            <Input
                className="font-bold"
                placeholder={'Mã đơn hàng'}
                prefix={<SearchOutlined />}
            />
            <Button
                type="primary"
                className="font-bold"
            >
                Áp dụng
            </Button>
        </div>
    )
}

export default OrderListFilter