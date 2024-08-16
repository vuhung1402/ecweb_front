import { ArrowLeftOutlined } from "@ant-design/icons";
import SildeBar from "@pages/profile/SildeBar";
import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import PaymentInfor from "./paymentInfor";
import UserInfo from "./userInfo";
import SupportInfo from "./supportInfo";

import OrderStatus from "@component/OrderStatus";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetail } from "./function";
import { data } from "@pages/admin/user/mock";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { logAgain } from "@utils/function";
import { Button, message, Popconfirm } from "antd";
import { FAIL, SUCCESS } from "@utils/message";
import Loading from "@component/Loading/Loading";
import { refundMoney, updateStatuOrder } from "@pages/admin/OrderDetail/function";

const OderDetail = () => {
    const navigate = useNavigate();
    const param = useParams();

    const [state, setState] = useState({
        data: undefined,
        isLoading: false,
    })

    const getData = async () => {
        const response = await getOrderDetail(param?.id);
        if (response?.success) {
            setState((prev) => ({ ...prev, data: response?.formatted_order_detail }))
        } else {
            if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                logAgain();
                navigate('/login');
            } else {
                message.error(FAIL);
            }
        }
    }

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
                                <SildeBar />
                            </div>
                            <div className="w-full md:w-3/4 px-5 md:px-0 h-full py-5">
                                <div className="flex gap-6 mb-2">
                                    <ArrowLeftOutlined
                                        className=" cursor-pointer"
                                        onClick={() => navigate('/order')}
                                    />
                                    <div className="uppercase font-bold">Chi tiết đơn hàng</div>
                                </div>
                                <div className="flex flex-col gap-3 mb-3">
                                    <div className="flex gap-3 font-bold">
                                        <div>Mã đơn hàng:</div>
                                        <div className="text-green-400">{param?.id}</div>
                                    </div>
                                    <div className="font-bold italic opacity-60">{state.data?.order_date}</div>
                                    <OrderStatus status={state.data?.status} />
                                </div>

                                {
                                    state?.data?.items?.map((item) => {
                                        return (
                                            <ProductCard data={item} />
                                        )
                                    })
                                }

                                <PaymentInfor data={state?.data?.total_price} />
                                <UserInfo address={state?.data?.address} phone={state?.data?.phone} name={state?.data?.name} />
                                {/* <SupportInfo/> */}
                                {
                                    state.data?.status === 1 &&
                                    <div className="flex gap-3 justify-end">
                                        <Popconfirm
                                            title="Hoàn tiền"
                                            description="Bạn muốn hoàn tiền đơn hàng này?"
                                            cancelText="Huỷ"
                                            okText="Xác nhận"
                                            onConfirm={handleRedundMoney}
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
            }
        </>
    )
}

export default OderDetail;