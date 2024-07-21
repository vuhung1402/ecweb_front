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
                        className="flex w-full p-3"
                    >
                        <SildeBar />
                        <div className=" flex flex-col gap-6 w-full">
                            <div className=" flex gap-6">
                                <ArrowLeftOutlined
                                    className=" cursor-pointer"
                                    onClick={() => navigate('/order')}
                                />
                                <div className=" uppercase font-medium">Chi tiết đơn hàng</div>
                            </div>
                            <div className=" flex flex-col gap-3">
                                <div className=" flex gap-3">
                                    <div>Mã đơn hàng:</div>
                                    <div className=" font-medium">{param?.id}</div>
                                </div>
                                <div>{state.data?.order_date}</div>
                                <OrderStatus status={state.data?.status} />
                                {/* <div className=" text-green-600 font-medium">Đã giao hàng</div> */}
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
                                <div className="flex gap-3 justify-end px-10">
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
                                        >
                                            Huỷ
                                        </Button>
                                    </Popconfirm>
                                </div>
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default OderDetail;