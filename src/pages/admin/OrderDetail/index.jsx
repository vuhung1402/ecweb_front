import React, { useEffect, useState } from "react";
import CardProduct from "../../../component/AdminUI/OrderList/CardProduct";
import PaymentInfo from "../../../component/AdminUI/OrderList/PaymentInfo";
import PaymentMethod from "../../../component/AdminUI/OrderList/PaymentMethod";
import { Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { data } from "../user/mock";
import { getOrderDetail } from "./function";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { logAgain } from "@utils/function";
import { FAIL } from "@utils/message";
import { statusOrder } from "../orders/mock";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Loading from "@component/Loading/Loading";

const OrderDetail = (props) => {
    const { handleDetail } = props;
    const params = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState({
        data: undefined,
    })

    const getData = async () => {
        const respone = await getOrderDetail(params?.id);
        if (respone?.success) {
            setState((prev) => ({ ...prev, data: respone?.formatted_order_detail }));
        } else {
            if (respone?.message === TOKEN_INVALID || respone?.message === NOT_AUTHENTICATION) {
                logAgain();
                navigate('/login');
            } else {
                message.error(FAIL);
            }
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            {
                state.data === undefined ? <Loading /> :
                    <div
                        className=" w-full py-3 flex flex-col justify-between px-10"
                        style={{
                            height: 'calc(100vh - 78px)'
                        }}
                    >
                        <div className="flex flex-col gap-2 px-10">
                            <div className=" font-medium flex gap-3 items-center" >
                                <div className=" cursor-pointer">
                                    <ArrowLeftOutlined />
                                </div>
                                <div>{state.data?.Order_id}</div>
                            </div>

                            <div className=" w-full">
                                <div className=" flex justify-between">
                                    <div className=" flex flex-col gap-2 h-[400px] w-1/2 overflow-y-auto scrollbar-hide">
                                        {
                                            state?.data?.items?.map((item) => {
                                                return (
                                                    <CardProduct dataDetail={item} />
                                                )
                                            })
                                        }
                                    </div>
                                    <div className=" flex flex-col w-1/2 gap-3">
                                        <PaymentInfo address={state?.data?.address} totalPrice={state.data?.total_price} />
                                        <PaymentMethod typePay={state.data?.type_pay} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" flex gap-3 justify-end px-10">
                            {
                                statusOrder.find((item) => item.status === state.data?.status)?.nextStatus?.map((nextStatusItem) => {
                                    return (
                                        <Button type="primary">{nextStatusItem?.label}</Button>
                                    )
                                })
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default OrderDetail