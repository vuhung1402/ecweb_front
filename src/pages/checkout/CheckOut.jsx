import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { endpoint } from "../../api/api"
import React, { useEffect, useState } from "react"
import { formatCurrencyVN, logAgain } from "@utils/function"
import { Button, Radio, Select, Space, message } from "antd"
import { getAddressInfo, order } from "./function"
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error"
import { paymentMethod } from "./mock"
import ProductCard from "./productCard"
import { FAIL } from "@utils/message"

const CheckOut = () => {
    const { code } = useParams();
    const user = useUserPackageHook();
    const navigate = useNavigate();
    const location = useLocation();

    const [state, setState] = useState({
        addresses: undefined,
        paymentMethod: 0,
        addressInfo: '',
        phone: '', 
        name: '',
        street:'',
        order: {},
        idAdress: '',
        isOrderLoading: false,
    })

    const getData = async () => {
        const result = await getAddressInfo();
        if (result?.message === TOKEN_INVALID || result?.message === NOT_AUTHENTICATION) {
            logAgain();
            navigate("/login");
        } else {
            state.addresses = result;
            const index = result?.findIndex((item) => item?.isDefault);
            state.idAdress = result[index]?._id;
            state.addressInfo = `${result[index]?.name}, ${result[index]?.number}, ${result[index]?.street}`
            state.name = result[index]?.name;
            state.phone = result[index]?.number;
            state.street = result[index]?.street;
        }
        setState((prev) => ({
            ...prev,
            order: location?.state?.order,
        }));
    }

    useEffect(() => {
        getData();
    }, [])

    const handleSelectPaymentMethod = (e) => {
        state.paymentMethod = e.target.value;
        setState((prev) => ({ ...prev }));
    }

    const handleSelectAddressInfo = (value, option) => {
        state.idAdress = value;
        state.addressInfo = option?.label;
        state.name = option?.name;
        state.phone = option?.phone;
        state.street = option?.street;
        setState((prev) => ({ ...prev }));
    }

    const handleOrder = async () => {
        setState((prev) => ({...prev , isOrderLoading:true}))
        const body = {
            order: state?.order,
            address: state?.street,
            phone: state.phone,
            name: state.name,
            type_pay: state?.paymentMethod,
            shipping_code: 0
        }
        console.log("body: ", body);
        const response = await order(body);
        console.log({response});
        if (response?.success) {
            if(response?.paymentUrl){
                window.open(response?.paymentUrl, '_blank')
            }else{
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

    return (
        <div className=" flex h-full p-3">
            {/* <Order data = {data} /> */}
            <div className=" w-3/4 p-5 border-r-[1px]">
                <div className=" mb-5">
                    <h1 className=" text-lg py-4">Thông tin giao hàng</h1>
                    <div className="">
                        <Select
                            className=" w-full h-10"
                            value={state.idAdress}
                            onSelect={handleSelectAddressInfo}
                            placeholder="Chọn thông tin giao hàng"
                            optionFilterProp="label"
                            options={state.addresses?.map((item) => ({
                                value: item?._id,
                                label: `${item?.name}, ${item?.number}, ${item?.street}`,
                                phone: item?.number,
                                name: item?.name,
                                street: item?.street,
                            }))}
                        />
                    </div>
                </div>

                <div className="w-full">
                    <h1 className=" text-lg py-4">Phương thức thanh toán</h1>
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
                                                className=" w-full h-full"
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
                    {/* <div>
                        <div class="flex items-center p-4 border rounded-sm">
                            <input id="default-radio-2" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Thanh toán khi giao hàng</label>
                        </div>
                        <div class="flex items-center p-4 border rounded-sm">
                            <input id="default-radio-3" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="default-radio-3" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Chuyển khoản qua ngân hàng</label>
                        </div>
                    </div> */}
                </div>

                <div className=" flex items-center justify-between py-6">
                    <div
                        onClick={() => navigate('/cart')}
                        className=" text-blue-600 cursor-pointer"
                    >
                        Giỏ hàng
                    </div>
                    {/* <button className=" uppercase bg-blue-600 p-3 text-white">Hoàn tất đơn hàng</button> */}
                    <Button
                        type="primary"
                        className=" uppercase p-3 !font-semibold !h-auto"
                        loading={state.isOrderLoading}
                        onClick={handleOrder}
                    >
                        Hoàn tất đơn hàng
                    </Button>
                </div>
            </div>

            <div className=" w-2/4 bg-[#fafafa] border-r border-t border-b p-3 h-full">
                <div
                    style={{
                        height: 'calc(100% - 202px)'
                    }}
                    className="overflow-y-auto"
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
                <div className="">
                    <div className="flex items-center gap-4 border-b-[1px] p-2">
                        <input placeholder="Mã giảm giá" className="  outline-none border px-3 py-2 rounded-sm w-2/3" />
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 w-1/3 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sử dụng</button>
                    </div>

                    <div className=" py-3 border-b-[1px] flex flex-col gap-3">
                        <div className=" flex items-center justify-between">
                            <p>Tạm tính</p>
                            <p className=" font-bold">{formatCurrencyVN(state?.order?.total_price)}</p>
                        </div>

                        {/* <div className=" flex items-center justify-between">
                            <p>Phí vận chuyển</p>
                            <p className=" font-bold">{formatCurrencyVN(295000)}</p>
                        </div> */}
                    </div>

                    <div className=" flex items-center justify-between py-3">
                        <p className=" text-lg">Tổng cộng</p>
                        <p className=" text-2xl font-bold text-red-500">{formatCurrencyVN(state?.order?.total_price)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut