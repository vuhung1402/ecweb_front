import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, message, Popconfirm } from "antd";

import SideBar from "@pages/Profile/SideBar";
import ProductCard from "./productCard";
import PaymentInfor from "./paymentInfor";
import UserInfo from "./userInfo";
import OrderStatus from "@component/OrderStatus";
import Loading from "@component/Loading/Loading";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { getOrderDetail } from "./function";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { logAgain } from "@utils/function";
import { FAIL, SUCCESS } from "@utils/message";
import { refundMoney, updateStatuOrder } from "@pages/admin/OrderDetail/function";

const OderDetail = () => {
    const navigate = useNavigate();
    const param = useParams();

    const [state, setState] = useState({
        data: undefined,
        isLoading: false,
        quantity: 0,
    })

    const getData = async () => {
        const response = await getOrderDetail(param?.id);
        if (response?.success) {
            console.log({response});
            const quantity = response?.formatted_order_detail?.items?.reduce((total, item) => total += item?.quantity,0);
            setState((prev) => ({ 
                ...prev,
                data: response?.formatted_order_detail,
                quantity: quantity,
            }));
        } else {
            if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                logAgain();
                navigate('/login');
            } else {
                message.error(FAIL);
            }
        }
    }

    // const handle = async (type_pay, user_id, Order_id, new_status_order) => {
    //     if(type_pay === 1){
    //         handleRedundMoney();
    //     }else{
    //         updateStatus(user_id, Order_id, new_status_order);
    //     }
    // }

    const handleRedundMoney = async () => {
        setState((prev) => ({ ...prev, isLoading: true }))
        const response = await refundMoney(state.data?.Order_id);
        if (response?.success) {
            message?.success(SUCCESS)
            setState((prev) => ({ ...prev, isLoading: false }))
        } else {
            if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                logAgain();
                navigate('/login');
            } else {
                message.error(FAIL);
                setState((prev) => ({ ...prev, isLoading: false }))
            }
        }
    }

    const updateStatus = async (user_id, Order_id, new_status_order) => {
        setState((prev) => ({ ...prev, isLoading: true }))
        const response = await updateStatuOrder(user_id, Order_id, new_status_order)
        if (response?.success) {
            message?.success(SUCCESS)
            setState((prev) => ({ ...prev, isLoading: false }))
        } else {
            if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                logAgain();
                navigate('/login');
            } else {
                message.error(FAIL);
                setState((prev) => ({ ...prev, isLoading: false }))
            }
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {
                state?.data === undefined ? <Loading />
                    :
                    <div
                        className="w-full"
                        style={{
                            height: 'calc(100% - 80px)',
                        }}
                    >
                        <div className=" flex flex-col items-center justify-center font-semibold text-5xl gap-3 p-5 border-b-[1px]">
                            <h1>Lịch sử mua hàng</h1>
                            <span className="bg-black p-[1.5px] w-14 flex items-center justify-center"></span>
                        </div>
                        <div className="flex flex-col md:flex-row w-full md:w-[750px] me:w-[970px] xl:w-[1170px] mx-auto">
                            <div className="md:w-1/4 px-5 md:px-0">
                                <SideBar />
                            </div>
                            <div className="w-full md:w-3/4 h-full my-3">
                                <div className="w-full h-full px-5 md:px-0">
                                    <div className="mb-2 flex items-center gap-3 hover:bg-[rgb(219,219,219)] w-fit transition-colors duration-300 cursor-pointer py-1 px-2 rounded-md">
                                        <ArrowLeftOutlined
                                            className="cursor-pointer"
                                            onClick={() => navigate('/order')}
                                        />
                                        <div className="text-sm font-semibold">Quay về</div>
                                    </div>
                                    <div className="border rounded-md">
                                        <div className="h-fit flex items-center gap-6 mb-2 border-b px-5 py-2">
                                            <div className="text-lg font-bold uppercase">Chi tiết đơn hàng</div>
                                            <div className="font-bold italic text-sm opacity-60">{state.data?.order_date}</div>
                                        </div>
                                        <div className="flex flex-col me:grid me:grid-cols-3 px-5 gap-3 mb-2">
                                            <div className="border rounded-md h-[200px]">
                                                <div className="w-full px-3 py-2 uppercase text-sm font-bold text-neutral-400 border-b">
                                                    Thông tin khách hàng
                                                </div>
                                                <div className="w-full">
                                                    <UserInfo
                                                        address={state?.data?.address}
                                                        phone={state?.data?.phone}
                                                        name={state?.data?.name}
                                                        email={state?.data?.email}
                                                    />
                                                </div>
                                            </div>
                                            <div className="border rounded-md h-[200px]">
                                                <div className="w-full px-3 py-2 uppercase text-sm font-bold text-neutral-400 border-b">
                                                    Địa chỉ
                                                </div>
                                                <div className="">
                                                    {state?.data?.address?.street}, {state?.data?.address?.wardName}, {state?.data?.address?.districtName}, {state?.data?.address?.provinceName}
                                                </div>
                                            </div>
                                            <div className="border rounded-md h-[200px]">
                                                <div className="w-full px-3 py-2 uppercase text-sm font-bold text-neutral-400 border-b">
                                                    Thông tin thanh toán
                                                </div>
                                                <div>
                                                    <PaymentInfor
                                                        data={state?.data?.total_price}
                                                        status = {state.data?.status}
                                                        shippingFee={state.data?.shipping_code}
                                                        typePay={state.data?.type_pay}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full px-5 mb-2">
                                            <div className="border px-3 py-2 rounded-md text-sm flex flex-col gap-3">
                                                <div className="flex gap-3">
                                                    <div className="font-medium w-28">Mã đơn hàng:</div>
                                                    <div className="font-bold">{param?.id}</div>
                                                </div>
                                                <div className="flex gap-3">
                                                    <div className="font-medium w-28">Số lượng:</div>
                                                    <div className="font-bold">{state.quantity}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3 mb-3">
                                            <OrderStatus status={state.data?.status} />
                                        </div>

                                        {
                                            state?.data?.items?.map((item) => {
                                                return (
                                                    <ProductCard data={item} />
                                                )
                                            })
                                        }

                                        {
                                            state.data?.status === 1  &&
                                            <div className="flex gap-3 justify-end">
                                                <Popconfirm
                                                    title="Huỷ đơn hàng"
                                                    description="Bạn muốn huỷ đơn hàng này?"
                                                    cancelText="Huỷ"
                                                    okText="Xác nhận"
                                                    onConfirm={
                                                        // () =>handle(state.data?.type_pay, state.data?.user_id, state.data.Order_id, 5)
                                                        handleRedundMoney
                                                    }
                                                    okButtonProps={{
                                                        loading: state.isLoading
                                                    }}
                                                >
                                                    <Button
                                                        type="primary"
                                                        className="font-bold"
                                                    >
                                                        Huỷ
                                                    </Button>
                                                </Popconfirm>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default OderDetail;