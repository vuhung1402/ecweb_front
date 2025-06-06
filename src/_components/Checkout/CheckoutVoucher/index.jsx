import useCheckoutStore from "@store/checkout";
import { Button, Input, Select, Space, TreeSelect } from "antd";
import React, { useState } from "react";

const CheckoutVoucher = (props) => {
    const { discountVouchers, shippingVouchers, applyPending } = props;

    const { applyVoucher } = props;
    const { setCodeVoucherDiscount, setCodeVoucherShipping } = useCheckoutStore()

    const onSelectVoucher = (value, type) => {
        if (type === 'discount') {
            setCodeVoucherDiscount(value)
        } else {
            setCodeVoucherShipping(value)
        }
    }

    return (
        <div className="flex items-center gap-4 border-b-[1px] py-2">
            <Select
                style={{
                    width: 150,
                }}
                placeholder="Chọn mã giảm giá"
                allowClear
                options={discountVouchers?.map((discountVoucher) => ({
                    label: discountVoucher?.name,
                    value: discountVoucher?.code,
                }))}
                onChange={(value) => onSelectVoucher(value, 'discount')}
            />
            <Select
                style={{
                    width: 150,
                }}
                placeholder="Mã miễn phí vận chuyển"
                allowClear
                options={shippingVouchers?.map((shippingVoucher) => ({
                    label: shippingVoucher?.name,
                    value: shippingVoucher?.code,
                }))}
                onChange={(value) => onSelectVoucher(value, 'shipping')}
            />

            <Button
                type="primary"
                className="w-1/3 font-medium rounded-lg text-sm"
                loading={applyPending}
                onClick={applyVoucher}
            >
                Sử dụng
            </Button>
        </div>
    )
}

export default CheckoutVoucher