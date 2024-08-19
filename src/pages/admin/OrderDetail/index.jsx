import React, { useEffect, useState } from "react";
import CardProduct from "../../../component/AdminUI/OrderList/CardProduct";
import PaymentInfo from "../../../component/AdminUI/OrderList/PaymentInfo";
import PaymentMethod from "../../../component/AdminUI/OrderList/PaymentMethod";
import { Button, message, Popconfirm, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { getOrderDetail, refundMoney, updateStatuOrder } from "./function";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { logAgain } from "@utils/function";
import { FAIL, SUCCESS } from "@utils/message";
import { statusOrder } from "../orders/mock";
import Loading from "@component/Loading/Loading";
import { LeftOutlined } from "@ant-design/icons";
import useWindowSize from "../../../hooks/useWindowSize";

const OrderDetail = (props) => {
    const { userId, orderId } = props;
    const { handleBack } = props;
    
    if (!userId && !orderId) return <div className="font-bold">Chi tiết sản phẩm sẽ hiển thị ở đây</div>
    
    const iw = useWindowSize().width;
    const navigate = useNavigate();

    const [state, setState] = useState({
        data: undefined,
        isLoading: false,
    });

    const arrayNotShowRefund = [0,5];

    const getData = async () => {
        const respone = await getOrderDetail(orderId, userId);
        if (respone?.success) {
            setState((prev) => ({ ...prev, data: respone?.formatted_order_detail }));
        } else {
            if (respone?.message === TOKEN_INVALID || respone?.message === NOT_AUTHENTICATION) {
                logAgain();
                navigate('/login');
            } else {
                message.error(FAIL);
            };
        };
    };

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

    useEffect(() => {
        state.data = undefined;
        setState(prev => ({...prev}));
        if (!userId || !orderId) return;
        getData();
    }, [userId, orderId])

    return (
        <>
            {
                state.data === undefined ? <Loading /> :
                    <div className="w-full h-full p-4 flex flex-col gap-2 overflow-y-auto">
                        <div className="w-full flex flex-col gap-2">
                            <div className="w-full items-center flex justify-between">
                                <div>
                                    {iw < 960 && (
                                        <div
                                            className="w-fit px-4 py-1 flex items-center gap-3 font-bold hover:bg-[rgb(219,219,219)] rounded-md transition-colors duration-200 cursor-pointer"
                                            onClick={handleBack}
                                        >
                                            <LeftOutlined />
                                            <div>Trở về</div>
                                        </div>
                                    )}
                                </div>
                                <Tag color="green" className="font-bold">
                                    {statusOrder.find((item) => item?.status === state.data.status).name}
                                </Tag>
                            </div>
                            <div className="w-full flex flex-col gap-3">
                                <div className="w-full flex flex-wrap items-center justify-center gap-2">
                                    {
                                        state?.data?.items?.map((item) => {
                                            return (
                                                <CardProduct dataDetail={item} />
                                            )
                                        })
                                    }
                                </div>
                                <div className="flex flex-col w-full gap-3">
                                    <PaymentInfo address={state?.data?.address} totalPrice={state.data?.total_price} name={state.data?.name} phone={state.data?.phone} price_pay={state.data?.price_pay} />
                                    <PaymentMethod typePay={state.data?.type_pay} status={state?.data?.status} />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-end">
                            {
                                statusOrder.find((item) => item.status === state.data?.status)?.nextStatus?.map((nextStatusItem) => {
                                    return (
                                        <Popconfirm
                                            title="Đổi trạng thái"
                                            description="Bạn muốn đổi trạng thái của đơn hàng?"
                                            cancelText="Huỷ"
                                            okText="Xác nhận"
                                            onConfirm={() => updateStatus(state.data?.user_id, state.data?.Order_id, nextStatusItem.status)}
                                            okButtonProps={{
                                                loading: state.isLoading
                                            }}
                                        >
                                            <Button
                                                type="primary"
                                                className="font-bold"
                                            >
                                                {nextStatusItem?.label}
                                            </Button>
                                        </Popconfirm>
                                    )
                                })
                            }
                            {
                                (state.data?.type_pay === 1 && !arrayNotShowRefund.includes(state?.data?.status) ) &&
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
                                        Hoàn tiền
                                    </Button>
                                </Popconfirm>
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default OrderDetail