import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Radio, Select, Space, message, Collapse } from "antd";

import ProductCard from "./productCard";
import { calculateShippingFee, formatCurrencyVN, logAgain } from "@utils/function";
import { getAddressInfo, order } from "./function";
import useWindowSize from "../../hooks/useWindowSize";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { FAIL } from "@utils/message";

import IconCart from '@icon/iconCart.svg';

import './style.scss';

const paymentMethod = [
    {
        value: 0,
        name: 'Thanh toán khi giao hàng',
    },
    {
        value: 1,
        name: 'Thanh toán bằng momo',
    },
];

const CheckOut = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const iw = useWindowSize().width;

    const [state, setState] = useState({
        price: 0,
        shippingFee: 0,
        addresses: undefined,
        paymentMethod: 0,
        addressInfo: '',
        phone: '',
        name: '',
        street: '',
        order: {},
        idAdress: '',
        isOrderLoading: false,
        isCollapse: true,
    });

    const getData = async () => {
        const result = await getAddressInfo();
        if (result?.message === TOKEN_INVALID || result?.message === NOT_AUTHENTICATION) {
            logAgain();
            navigate("/login");
        } else {
            const index = result?.findIndex((item) => item?.isDefault);
            const res = await calculateShippingFee(result[index]?.districtID, result[index]?.wardCode);
            let fee = 0;
            if (res?.code === 200) {
                fee = res?.data?.total;
            }

            setState((prev) => ({
                ...prev,
                shippingFee: fee,
                addresses: result,
                idAdress: result[index]?._id,
                addressInfo: result[index],
                name: result[index]?.name,
                phone: result[index]?.number,
                street: result[index]?.street,
                order: location?.state?.order,
                price: location?.state?.order?.total_price,
            }));
        }
    };

    useEffect(() => {
        getData();
    }, []);

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
            shippingFee: fee,
        }));
    }

    const handleOrder = async () => {
        setState((prev) => ({ ...prev, isOrderLoading: true }))
        const body = {
            order: state?.order,
            address: state?.addressInfo,
            phone: state.phone,
            name: state.name,
            type_pay: state?.paymentMethod,
            shipping_code: state.shippingFee
        }
        console.log({body})
        const response = await order(body);
        if (response?.success) {
            if (response?.paymentUrl) {
                window.open(response?.paymentUrl, '_blank')
            } else {
                navigate('/order');
            }
        } else {
            if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                logAgain();
                navigate('/login');
            } else {
                message.error(FAIL);
            }
        }
    }

    const handleChangeCollapse = (status) => {
        setState(prev => ({ ...prev, isCollapse: status.length === 0 }));
    };

    return (
        <div className="w-full flex flex-col-reverse me:flex-row p-3 checkout-page me:h-full">
            <div className="w-full mx-auto max-w-[640px] me:max-w-none me:mx-0 me:w-2/3 p-5 me:border-r-[1px]">
                <div className="mb-5">
                    <h1 className="text-lg py-4 font-medium tracking-wide">Thông tin giao hàng</h1>
                    <div className="">
                        <Select
                            className="w-full h-10 font-medium"
                            rootClassName="checkout-select"
                            value={state.idAdress}
                            onSelect={handleSelectAddressInfo}
                            placeholder="Chọn thông tin giao hàng"
                            optionFilterProp="label"
                            options={state.addresses?.map((item) => ({
                                value: item?._id,
                                label: `${item?.name}, ${item?.number}, ${item?.street}, ${item?.wardName}, ${item?.districtName}, ${item?.provinceName}`,
                                wardCode: item?.wardCode,
                                districtID: item?.districtID,
                                addressInfor: item,
                                phone: item?.number,
                                name: item?.name,
                                street: item?.street,
                            }))}
                        />
                    </div>
                </div>

                <div className="w-full">
                    <h1 className="text-lg py-4 font-medium tracking-wide">Phương thức thanh toán</h1>
                    <Radio.Group
                        className=" w-full"
                        onChange={handleSelectPaymentMethod}
                        value={state.paymentMethod}
                    >
                        <Space
                            className=" w-full h-full"
                            direction="vertical"
                        >
                            {
                                paymentMethod.map((item) => {
                                    return (
                                        <div class="flex items-center p-4 border rounded-sm w-full">
                                            <Radio
                                                className="w-full h-full font-medium"
                                                value={item?.value}
                                            >
                                                {item?.name}
                                            </Radio>
                                        </div>
                                    )
                                })
                            }
                        </Space>
                    </Radio.Group>
                </div>

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
                        loading={state.isOrderLoading}
                        onClick={handleOrder}
                    >
                        Hoàn tất đơn hàng
                    </Button>
                </div>
            </div>

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
                                    state?.order?.items?.map((item) => {
                                        return (
                                            <ProductCard
                                                data={item}
                                            />
                                        )
                                    })
                                }
                            </div>
                        ),
                        extra: formatCurrencyVN(state?.order?.total_price),
                        headerClass: 'italic'
                    }]}
                    rootClassName="block me:hidden"
                />
                <div
                    style={{
                        height: 'calc(100% - 202px)'
                    }}
                    className="hidden me:block overflow-y-auto"
                >
                    {
                        state?.order?.items?.map((item) => {
                            return (
                                <ProductCard
                                    data={item}
                                />
                            )
                        })
                    }
                </div>
                <div>
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

                    <div className={`${iw < 960 ? state.isCollapse ? 'hidden' : 'flex' : 'flex'} py-3 border-b-[1px] flex-col gap-3`}>
                        <div className=" flex items-center justify-between">
                            <p>Phí vận chuyển</p>
                            <p className=" font-bold">{formatCurrencyVN(state.shippingFee)}</p>
                        </div>
                        <div className=" flex items-center justify-between">
                            <p>Tạm tính</p>
                            <p className=" font-bold">{formatCurrencyVN(state.price)}</p>
                        </div>
                    </div>

                    <div className={`${iw < 960 ? state.isCollapse ? 'hidden' : 'flex' : 'flex'} items-center justify-between py-3`}>
                        <p className=" text-lg">Tổng cộng</p>
                        <p className=" text-2xl font-bold text-red-500">{formatCurrencyVN(state.price + state.shippingFee)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut