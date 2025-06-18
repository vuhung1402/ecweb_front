import useCheckoutStore from "@store/checkout";
import { Button, Input, Select, Space, TreeSelect } from "antd";
import React, { useState } from "react";

const CheckoutVoucher = (props) => {
    const { discountVouchers, shippingVouchers, applyPending } = props;

    const { applyVoucher, initialPrice, initialShippingFee } = props;
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
        <div className="flex flex-col items-center gap-1 border-b-[1px] py-2">
            <Select
                style={{ width: '100%' }}
                onClear={() => {
                    setCodeVoucherDiscount('')
                    setExpiredAtVoucherDiscount(0)
                    initialPrice()
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
                style={{ width: '100%' }}
                onClear={() => {
                    setCodeVoucherShipping('')
                    setExpiredAtVoucherShipping(0)
                    initialShippingFee()
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
                className="w-full font-medium rounded-lg text-sm"
                loading={applyPending}
                onClick={applyVoucher}
            >
                Sử dụng
            </Button>
        </div>
    )
}

export default CheckoutVoucher