import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useState } from "react";

const OrderListFilter = (props) => {
    const { query } = props
    const { handleChangeInfor } = props

    const [state, setState] = useState({
        input:''
    })

    const handleFilter = () => {
        handleChangeInfor(`${query}&orderId=${state.input}`, 'query');
    }


    return (
        <div className=" flex gap-2">
            <Input
                className="font-bold"
                placeholder={'Mã đơn hàng'}
                onChange={(e) => setState((prev) => ({...prev, input: e.target.value}))}
                prefix={<SearchOutlined />}
            />
            <Button
                type="primary"
                className="font-bold"
                onClick={handleFilter}
            >
                Áp dụng
            </Button>
        </div>
    )
}

export default OrderListFilter