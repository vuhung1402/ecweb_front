import React, { useEffect, useState } from "react";
import { Button, Select, message, Collapse, notification } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import CheckoutTotal from "@_components/Checkout/CheckoutTotal";
import CheckoutPrice from "@_components/Checkout/CheckoutPrice";
import CheckoutAction from "@_components/Checkout/CheckoutAction";
import CheckoutVoucher from "@_components/Checkout/CheckoutVoucher";
import { CheckoutContainer, CheckoutAddress } from "./CheckoutContainer";
import CheckoutPaymentMethod from "@_components/Checkout/CheckoutPaymentMethod";
import ModalAddAddress from "@_components/Checkout/ModalAddress";
import ProductCard from "@_components/Checkout/ProductCard";

import { useApplyVoucher, useCreateOrder, useGetAddressInfo, useGetReleasedVoucher } from "./function";
import useCheckoutStore from "@store/checkout";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { calculateShippingFee, formatCurrencyVN, getProvinces, logAgain } from "@utils/function";
import { handleAddresOptions } from "@utils/checkout";
import useGetCartQuantity from "@hooks/useGetCartQuantity";

import IconCart from '@icon/iconCart.svg';

import './style.scss';

const CheckOut = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { order, codeVoucherDiscount, codeVoucherShipping } = useCheckoutStore()
    const { mutate } = useCreateOrder()
    const { data: addressInfo, refetch } = useGetAddressInfo()
    const { data: voucher } = useGetReleasedVoucher()
    const { getQuantity } = useGetCartQuantity()

    const mutateApplyVoucher = useApplyVoucher();

    const [state, setState] = useState({
        price: order?.total_price,
        initialShippingFee: 0,
        shippingFee: 0,
        addresses: undefined,
        paymentMethod: 0,
        phone: '',
        name: '',
        street: '',
        order: location?.state?.order,
        idAdress: '',
        provinces: undefined,
        isOrderLoading: false,
        isCollapse: true,
        insertAddress: false,
        addressInfor: ''
    });

    useEffect(() => {

        const handleData = async () => {

            if (addressInfo?.length > 0) {
                const index = addressInfo?.findIndex((item) => item?.isDefault)

                if (index !== -1) {

                    const districtID = addressInfo[index]?.districtID
                    const wardCode = addressInfo[index]?.wardCode

                    const res = await calculateShippingFee(districtID, wardCode)

                    let fee = 0
                    if (res?.code === 200) fee = res?.data?.total

                    const addressesOptions = handleAddresOptions(addressInfo)

                    setState(prev => ({
                        ...prev,
                        shippingFee: fee,
                        initialShippingFee: fee,
                        addresses: addressesOptions,
                        addressInfor: addressInfo[index],
                        idAdress: addressInfo[index]?._id
                    }))

                } else {
                    const addressesOptions = handleAddresOptions(addressInfo)
                    setState(prev => ({ ...prev, addresses: addressesOptions }))
                }
            } else {
                const response = await getProvinces();
                if (response?.code === 200) {
                    setState((prev) => ({ ...prev, provinces: response?.data }))
                }
            }
        }

        handleData()

    }, [addressInfo])

    const handleSelectPaymentMethod = (e) => {
        state.paymentMethod = e.target.value;
        setState((prev) => ({ ...prev }));
    }

    const handleSelectAddressInfo = async (value, option) => {
        const res = await calculateShippingFee(option?.districtID, option?.wardCode);
        let fee = 0;
        if (res?.code === 200) {
            fee = res?.data?.total;
        }
        setState((prev) => ({
            ...prev,
            idAdress: value,
            addressInfo: option?.addressInfor,
            name: option?.name,
            phone: option?.phone,
            street: option?.street,
            initialShippingFee: fee,
            shippingFee: fee,
        }));
    }

    const handleOrder = async () => {
        setState((prev) => ({ ...prev, isOrderLoading: true }))

        const body = {
            order: order,
            address: state?.addressInfor,
            phone: state.addressInfor?.number,
            name: state.addressInfor?.name,
            type_pay: state?.paymentMethod,
            shipping_code: state.shippingFee,
            checkout_price: state.price,
        }

        mutate(body, {
            onSuccess: (res) => {
                getQuantity()
                if (res?.paymentUrl) {
                    window.open(res?.paymentUrl, '_blank')
                } else {
                    navigate('/order')
                }
            },
            onError: (error) => {
                const response = error?.response?.data
                if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate('/login');
                } else {
                    notification.info({
                        message: 'Thông báo',
                        description: response?.message,
                    });
                    navigate('/cart');
                }
            }
        })
    }

    const handleChangeCollapse = (status) => {
        setState(prev => ({ ...prev, isCollapse: status.length === 0 }));
    };

    const handleInsertAddress = () => {
        setState(prev => ({ ...prev, insertAddress: !state.insertAddress }));
    }

    const applyVoucher = () => {
        const body = {
            code: [codeVoucherDiscount, codeVoucherShipping],
            shippingFee: state.initialShippingFee,
            price: order?.total_price,
        }

        mutateApplyVoucher.mutateAsync(body, {
            onSuccess: (res) => {
                setState(prev => ({ ...prev, price: res?.discountedPrice, shippingFee: res?.discountedShippingFee }));
                message.success('Áp dụng mã giảm giá thành công');
            },
            onError: (error) => {
                message.error(error?.response?.data?.message);
            }
        })
    }

    return (
        <CheckoutContainer isLoading={!addressInfo || !order}>
            <CheckoutAddress>
                {
                    addressInfo?.length > 0 ?
                        (
                            <div className="mb-5">
                                <h1 className="text-lg py-4 font-medium tracking-wide">Thông tin giao hàng</h1>
                                <Select
                                    optionFilterProp="label"
                                    rootClassName="checkout-select"
                                    className="w-full h-10 font-medium"
                                    placeholder="Chọn thông tin giao hàng"
                                    value={state.idAdress}
                                    options={state.addresses}
                                    onSelect={handleSelectAddressInfo}
                                />
                            </div>
                        ) :
                        (
                            <>
                                <div>
                                    <Button
                                        type="primary"
                                        onClick={handleInsertAddress}
                                    >
                                        Thêm thông tin giao hàng
                                    </Button>
                                </div>
                                <ModalAddAddress
                                    open={state.insertAddress}
                                    provinces={state.provinces}
                                    refetch={refetch}
                                    handleInsertAddress={handleInsertAddress}
                                />
                            </>
                        )
                }

                <CheckoutPaymentMethod
                    paymentMethod={state.paymentMethod}
                    onSelectPaymentMethod={handleSelectPaymentMethod}
                />

                <CheckoutAction
                    isOrderLoading={state.isOrderLoading}
                    onOrder={handleOrder}
                />

            </CheckoutAddress>

            <div className="w-full mx-auto max-w-[640px] me:max-w-none me:mx-0 me:w-1/3 bg-[#fafafa] rounded-md border-l me:border-l-0 border-r border-t border-b p-3">
                <Collapse
                    expandIcon={() => (
                        <IconCart className="!text-[#76a9fa]" />
                    )}
                    onChange={handleChangeCollapse}
                    items={[{
                        key: 'checkout-collapse-1',
                        label: 'Hiển thị thông tin đơn hàng',
                        children: (
                            <div>
                                {
                                    order?.items?.map((item) => {
                                        return (
                                            <ProductCard
                                                data={item}
                                            />
                                        )
                                    })
                                }
                            </div>
                        ),
                        extra: formatCurrencyVN(order?.total_price),
                        headerClass: 'italic'
                    }]}
                    rootClassName="block me:hidden"
                />

                <div
                    style={{ height: 'calc(100% - 202px)' }}
                    className="hidden me:block overflow-y-auto"
                >
                    {order?.items?.map((item) => {
                        return (
                            <ProductCard
                                data={item}
                            />
                        )
                    })}
                </div>

                <CheckoutVoucher
                    discountVouchers={voucher?.dicountVouchers}
                    shippingVouchers={voucher?.shippingVouchers}
                    applyPending = {mutateApplyVoucher?.isPending}
                    applyVoucher={applyVoucher}
                />

                <CheckoutPrice
                    shippingFee={state.shippingFee}
                    isCollapse={state.isCollapse}
                    price={state?.price}
                />

                <CheckoutTotal
                    price={state?.price}
                    isCollapse={state.isCollapse}
                    shippingFee={state.shippingFee}
                />

            </div>
        </CheckoutContainer>
    )
}

export default CheckOut