import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, message, Popconfirm } from "antd";

import SideBar from "@widgets/SideBar";
import ProductCard from "../../_components/OrderDetail/productCard";
import PaymentInfor from "../../_components/OrderDetail/paymentInfor";
import UserInfo from "../../_components/OrderDetail/userInfo";
import OrderStatus from "@widgets/OrderStatus";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { useCancelOrder, useGetOrderDetail, useGetOrderHistory, useRefundMoney } from "./function";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { logAgain } from "@utils/function";
import { FAIL, SUCCESS } from "@utils/message";
import OderDetailContainer from "./OrderDetailContainer";
import { AddressInforDetail, AddressInforTitle, AddressInforWrapper, BackTitle, BackWrapper, ContentOrderInfoWrapper, ContentWrapper, InforTitle, InforWrapper, OrderActionWrapper, OrderId, OrderInfoWrapper, OrderStatusWrapper, PaymentInforWrapper, PaymentMethod, PaymentMethodContentWrapper, PaymentMethodWrapper, PaymentTitle, SideBarWrapper, Title, UserInforContentWrapper, UserInforDetailWrapper, UserInforTitle, UserInforWrapper } from "./OrderDetail";
import ModalRequestReturnOrder from "@_components/OrderDetail/ModalRequestReturnOrder";
import ReturnRequest from "@_components/Admin/OrderDetail/ReturnRequest";

const OderDetail = () => {
    const navigate = useNavigate();

    const param = useParams();

    const [state, setState] = useState({
        openModal: false,
    });

    const { mutateAsync: muatateCancelOrder, isPending: isPendingCancelOrder } = useCancelOrder();

    const { mutateAsync: mutateRefundMoney, isPending: isPendingRefundMoney } = useRefundMoney();

    const { data: orderDetail, isLoading: isGetOrderDetail,
        refetch: refetchOrderDetail } = useGetOrderDetail(param?.id)

    const { data: orderHistory, refetch: refetchOrderHistory } = useGetOrderHistory(param?.id)

    const paymentMethdod = {
        0: "Nhận tiền khi giao hàng",
        1: "Thanh toán bằng momo"
    }[orderDetail?.formatted_order_detail?.type_pay]

    const isShowRequestReturn = [6, 8, 9];

    const handleOpenModal = () => {
        setState(prev => ({ ...prev, openModal: !state.openModal }));
    }

    const handleRedundMoney = async () => {
        const body = {
            Order_id: orderDetail?.formatted_order_detail?.Order_id,
        }
        mutateRefundMoney(body, {
            onSuccess: () => {
                message?.success(SUCCESS);
                refetchOrderDetail();
            },
            onError: (error) => {
                const response = error?.response?.data;
                if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate('/login');
                } else {
                    message.error(FAIL);
                }
            }
        });
    }

    const cancelShipCode = async () => {
        // setState((prev) => ({ ...prev, isLoading: true }))
        const body = {
            Order_id: orderDetail?.formatted_order_detail?.Order_id,
        }
        muatateCancelOrder(body, {
            onSuccess: () => {
                message?.success(SUCCESS);
                refetchOrderDetail();
            },
            onError: (error) => {
                const response = error?.response?.data;
                if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate('/login');
                } else {
                    message.error(FAIL);
                }
            }
        })
    }

    const handleCancelOrder = async () => {
        if (orderDetail?.formatted_order_detail?.type_pay === 0) {
            cancelShipCode();
        } else {
            handleRedundMoney();
        }
    }

    return (
        <OderDetailContainer isGetOrderDetail={isGetOrderDetail}>
            <Title />
            <ContentWrapper>
                <SideBarWrapper>
                    <SideBar />
                </SideBarWrapper>
                <OrderInfoWrapper>
                    <ContentOrderInfoWrapper>
                        <BackWrapper>
                            <ArrowLeftOutlined
                                className="cursor-pointer"
                                onClick={() => navigate('/order')}
                            />
                            <BackTitle />
                        </BackWrapper>
                        <InforWrapper>
                            <InforTitle order_date={orderDetail?.formatted_order_detail?.order_date} />
                            <UserInforWrapper>
                                <UserInforContentWrapper>
                                    <UserInforTitle />
                                    <UserInforDetailWrapper>
                                        <UserInfo
                                            address={orderDetail?.formatted_order_detail?.address}
                                            phone={orderDetail?.formatted_order_detail?.phone}
                                            name={orderDetail?.formatted_order_detail?.name}
                                            email={orderDetail?.formatted_order_detail?.email}
                                        />
                                    </UserInforDetailWrapper>
                                </UserInforContentWrapper>
                                <AddressInforWrapper>
                                    <AddressInforTitle />
                                    <AddressInforDetail
                                        street={orderDetail?.formatted_order_detail?.address?.street}
                                        wardName={orderDetail?.formatted_order_detail?.address?.wardName}
                                        districtName={orderDetail?.formatted_order_detail?.address?.districtName}
                                        provinceName={orderDetail?.formatted_order_detail?.address?.provinceName}
                                    />
                                </AddressInforWrapper>
                                <PaymentInforWrapper>
                                    <PaymentTitle />
                                    <PaymentInfor
                                        data={orderDetail?.formatted_order_detail?.total_price}
                                        status={orderDetail?.formatted_order_detail?.status}
                                        shippingFee={orderDetail?.formatted_order_detail?.shipping_code}
                                        typePay={orderDetail?.formatted_order_detail?.type_pay}
                                        price_pay={orderDetail?.formatted_order_detail?.price_pay}
                                    />
                                </PaymentInforWrapper>
                            </UserInforWrapper>
                            <PaymentMethodWrapper>
                                <PaymentMethodContentWrapper>
                                    <OrderId id={param?.id} />
                                    <PaymentMethod paymentMethdod={paymentMethdod} />
                                </PaymentMethodContentWrapper>
                            </PaymentMethodWrapper>
                            <OrderStatusWrapper>
                                <OrderStatus orderHistory={orderHistory?.log} />
                            </OrderStatusWrapper>

                            {
                                isShowRequestReturn.includes(orderDetail?.formatted_order_detail?.status)
                                &&
                                <ReturnRequest
                                listImage={orderDetail?.formatted_order_detail?.list_image}
                                description={orderDetail?.formatted_order_detail?.description}
                            />
                            }

                            {
                                orderDetail?.formatted_order_detail?.items?.map((item) => {
                                    return (
                                        <ProductCard data={item} />
                                    )
                                })
                            }

                            {
                                orderDetail?.formatted_order_detail?.status === 1 &&
                                <OrderActionWrapper>
                                    <Popconfirm
                                        title="Huỷ đơn hàng"
                                        description="Bạn muốn huỷ đơn hàng này?"
                                        cancelText="Huỷ"
                                        okText="Xác nhận"
                                        onConfirm={
                                            // () =>handle(state.data?.type_pay, state.data?.user_id, state.data.Order_id, 5)
                                            handleCancelOrder
                                        }
                                        okButtonProps={{
                                            loading: isPendingCancelOrder || isPendingRefundMoney
                                        }}
                                    >
                                        <Button
                                            type="primary"
                                            className="font-bold"
                                        >
                                            Huỷ
                                        </Button>
                                    </Popconfirm>
                                </OrderActionWrapper>
                            }

                            {
                                orderDetail?.formatted_order_detail?.status === 4 &&
                                <OrderActionWrapper>
                                    <Button
                                        type="primary"
                                        className="font-bold"
                                        onClick={handleOpenModal}
                                    >
                                        Yêu cầu trả hàng
                                    </Button>
                                </OrderActionWrapper>
                            }
                        </InforWrapper>
                    </ContentOrderInfoWrapper>
                </OrderInfoWrapper>
            </ContentWrapper>

            <ModalRequestReturnOrder
                open={state.openModal}
                OrderId={orderDetail?.formatted_order_detail?.Order_id}
                refetchOrderDetail={refetchOrderDetail}
                refetchOrderHistory={refetchOrderHistory}
                handleOpenModal={handleOpenModal}
            />
        </OderDetailContainer>
    )
}

export default OderDetail;