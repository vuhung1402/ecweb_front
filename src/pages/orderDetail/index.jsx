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
import { message } from "antd";
import { FAIL } from "@utils/message";
import Loading from "@component/Loading/Loading";

const OderDetail = () => {
    const navigate = useNavigate();
    const param = useParams();

    const [state, setState] = useState({
        data: undefined,
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
                        {/* <div className=" flex flex-col items-center justify-center font-semibold text-5xl gap-3 p-5 border-b-[1px]">
                    <h1>Lịch sử mua hàng</h1>
                    <span className="bg-black p-[1.5px] w-14 flex items-center justify-center"></span>
                </div> */}
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
                            <UserInfo address={state?.data?.address} phone = {state?.data?.phone} name = {state?.data?.name}  />
                            {/* <SupportInfo/> */}
                        </div>
                    </div>
            }
        </>
    )
}

export default OderDetail;