import { SearchOutlined } from "@ant-design/icons";
import { optionSearchOrder } from "@pages/admin/orders/mock";
import { Button, Input, Select } from "antd";
import React, { useState } from "react";
import CardOrder from "./CardOrder";
import OrderDetail from "./OrderDetail";

const OrderList = () => {
    const [state, setState] = useState({
        placeholder: '',
        selectValue: '1',
        isDetaile: false,
        codeOrder: '',
    })

    const handleSelect = (value, option) => {
        state.selectValue = value;
        state.placeholder = option.label;
        setState(prev => ({ ...prev }));
    }

    //truyenf param code order xuong va gan cho state.codeOrder
    const handleDetail = () => {
        state.isDetaile = !state.isDetaile;
        // state.codeOrder = '';
        setState(prev => ({ ...prev }));
    }

    return (
        <div className=" w-full flex flex-col gap-4 px-5">
            {
                state.isDetaile ?
                    <OrderDetail
                        handleDetail={handleDetail}
                    /> :
                    <>
                        <div className="w-full flex justify-end items-center gap-3">
                            <div className=" flex gap-2">
                                <Select
                                    style={{
                                        width: 200,
                                    }}
                                    value={state.selectValue}
                                    onSelect={handleSelect}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={optionSearchOrder}
                                />
                                <Input
                                    placeholder={state.placeholder || 'Mã đơn hàng'} prefix={<SearchOutlined />}
                                />
                            </div>
                            <Button type="primary">Áp dụng</Button>
                        </div>
                        <div
                            className="w-full"
                        >
                            <CardOrder
                                handleDetail={handleDetail}
                            />
                        </div>
                    </>
            }
        </div>
    )
}

export default OrderList;