import React from "react";
import { Button, message, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetOrderDetail, useRefundMoney, useUpdateStatusOrder } from "./function";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { logAgain } from "@utils/function";
import { FAIL, SUCCESS } from "@utils/message";
import { statusOrder } from "../orders/mock";
import Loading from "@component/Loading/Loading";
import useWindowSize from "../../../hooks/useWindowSize";
import OrderDetailContainer from "./OrderDetailContainer";
import { OrderDetailActionWrapper, OrderDetailWrapper } from "./OrderDetail";
import InforOrderDetail from "@_components/Admin/OrderDetail/InforOrderDetail";

const OrderDetail = (props) => {
    const { userId, orderId } = props;
    const { handleBack, refetchOrderList } = props;

    const iw = useWindowSize().width;
    const navigate = useNavigate();

    const arrayNotShowRefund = [0, 1, 2, 5, 6, 7];
    const arrayNotShowCancelOrder = [0, 3, 4, 5, 6]

    const { isLoading: isGetOrderDetail, data: detailData, refetch: refetchOrderDetail } = useGetOrderDetail(orderId, userId);

    const mutateUpdateStatusOrder = useUpdateStatusOrder();

    const mutateRefundMoney = useRefundMoney();

    const updateStatus = async (user_id, Order_id, new_status_order) => {
        mutateUpdateStatusOrder.mutateAsync({ user_id, Order_id, new_status_order },
            {
                onSuccess: (data, variable, context) => {
                    message?.success(SUCCESS);
                    refetchOrderList();
                    refetchOrderDetail();
                },
                onError: (error, context) => {
                    const response = error?.response?.data;
                    if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                        logAgain();
                        navigate('/login');
                    } else {
                        message.error(FAIL);
                    }
                }
            }
        )
    }

    const handleRedundMoney = async () => {
        const body = {
            Order_id: detailData?.formatted_order_detail?.Order_id,
            user_id: detailData?.formatted_order_detail?.user_id,
        }
        mutateRefundMoney.mutateAsync(body,
            {
                onSuccess: (data, variable, context) => {
                    message?.success(SUCCESS);
                    refetchOrderList();
                    refetchOrderDetail();
                },
                onError: (error, context) => {
                    const response = error?.response?.data;
                    if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                        logAgain();
                        navigate('/login');
                    } else {
                        message.error(FAIL);
                    }
                }
            }
        )
    }

    const handleUpdate = async (user_id, Order_id, newStatus) => {
        updateStatus(user_id, Order_id, newStatus);
    }

    const cancelOrder = async () => {
        if (detailData?.formatted_order_detail?.type_pay === 0) {
            updateStatus(detailData?.formatted_order_detail?.user_id, detailData?.formatted_order_detail?.Order_id, 5);
        } else {
            handleRedundMoney();
        }
    }

    const refundOrder = async () => {
        if (detailData?.formatted_order_detail?.type_pay === 0) {
            updateStatus(detailData?.formatted_order_detail?.user_id, detailData?.formatted_order_detail?.Order_id, 6);
        } else {
            handleRedundMoney();
        }
    }

    if (!userId || !orderId) return <div className="font-bold">Chi tiết sản phẩm sẽ hiển thị ở đây</div>

    if (isGetOrderDetail) return <Loading />

    return (
        <OrderDetailContainer>
            <OrderDetailWrapper>
                <InforOrderDetail
                    iw={iw}
                    statusOrder={statusOrder}
                    detailData={detailData}
                    handleBack={handleBack}
                />
            </OrderDetailWrapper>
            <OrderDetailActionWrapper>
                {
                    statusOrder.find((item) => item.status === detailData?.formatted_order_detail?.status)?.nextStatus?.map((nextStatusItem) => {
                        return (
                            <Popconfirm
                                title="Đổi trạng thái"
                                description="Bạn muốn đổi trạng thái của đơn hàng?"
                                cancelText="Huỷ"
                                okText="Xác nhận"
                                onConfirm={() => handleUpdate(detailData?.formatted_order_detail?.user_id, detailData?.formatted_order_detail?.Order_id, nextStatusItem.status)}
                                okButtonProps={{
                                    loading: mutateUpdateStatusOrder.isPending
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
                    !arrayNotShowCancelOrder.includes(detailData?.formatted_order_detail?.status) &&
                    <Popconfirm
                        title="Hoàn tiền"
                        description="Bạn muốn huỷ đơn hàng này?"
                        cancelText="Huỷ"
                        okText="Xác nhận"
                        onConfirm={cancelOrder}
                        okButtonProps={{
                            loading: mutateRefundMoney.isPending || mutateUpdateStatusOrder.isPending
                        }}
                    >
                        <Button
                            type="primary"
                            className="font-bold"
                        >
                            Huỷ đơn hàng
                        </Button>
                    </Popconfirm>
                }
                {
                    (!arrayNotShowRefund.includes(detailData?.formatted_order_detail?.status)) &&
                    <Popconfirm
                        title="Hoàn tiền"
                        description="Bạn muốn trả hàng/hoàn tiền đơn hàng này?"
                        cancelText="Huỷ"
                        okText="Xác nhận"
                        onConfirm={refundOrder}
                        okButtonProps={{
                            loading: mutateRefundMoney.isPending || mutateUpdateStatusOrder.isPending
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
            </OrderDetailActionWrapper>
        </OrderDetailContainer>
    )
}

export default OrderDetail