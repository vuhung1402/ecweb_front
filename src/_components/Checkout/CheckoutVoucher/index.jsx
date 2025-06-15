import useCheckoutStore from "@store/checkout";
import { Button, Input, Select, Space, TreeSelect } from "antd";
import React, { useState } from "react";

const CheckoutVoucher = (props) => {
    const { discountVouchers, shippingVouchers, applyPending } = props;

    const { applyVoucher } = props;
    const { setCodeVoucherDiscount, setCodeVoucherShipping, setExpiredAtVoucherDiscount, setExpiredAtVoucherShipping } = useCheckoutStore()

    const onSelectVoucher = (_, option) => {
        console.log(option);
        if (option?.type === 'discount') {
            setCodeVoucherDiscount(option?.value)
            setExpiredAtVoucherDiscount(option?.expiredAt)
        } else if (option?.type === 'shipping') {
            setCodeVoucherShipping(option?.value)
            setExpiredAtVoucherShipping(option?.expiredAt)
        }
    }

    return (
        <div className="flex items-center gap-4 border-b-[1px] py-2">
            <Select
                style={{
                    width: 150,
                }}
                onClear={() => {
                    setCodeVoucherDiscount('')
                    setExpiredAtVoucherDiscount(0)
                }}
                placeholder="Chọn mã giảm giá"
                allowClear
                options={discountVouchers?.map((discountVoucher) => ({
                    label: discountVoucher?.name,
                    value: discountVoucher?.code,
                    type: 'discount',
                    expiredAt: discountVoucher?.expiredAt
                }))}
                onChange={onSelectVoucher}
            />
            <Select
                style={{
                    width: 150,
                }}
                onClear={() => {
                    setCodeVoucherShipping('')
                    setExpiredAtVoucherShipping(0)
                }}
                placeholder="Mã miễn phí vận chuyển"
                allowClear
                options={shippingVouchers?.map((shippingVoucher) => ({
                    label: shippingVoucher?.name,
                    value: shippingVoucher?.code,
                    type: 'shipping',
                    expiredAt: shippingVoucher?.expiredAt
                }))}
                onChange={onSelectVoucher}
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