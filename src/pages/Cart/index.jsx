import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logAgain } from "@utils/function";
import { useDispatch } from "react-redux";
import { numOfCartPackage } from "@redux/actions";
import { message, notification } from "antd";

import CartCard from "@widgets/CartCard";
import CartContainer from "./CartContainer";
import CartHeader from "@_components/Cart/CartHeader";

import { useGetCart, useDeleteItemCart, useCheckout, useUpdateItemCart } from "@api/Cart";

import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { FAIL, SUCCESS } from "@utils/message";
import CartItems from "@_components/Cart/CartItems";
import CartCheckout from "@_components/Cart/CartCheckout";
import useGetCartQuantity from "@hooks/useGetCartQuantity";
import useCheckoutStore from "@store/checkout";

const CartPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { getQuantity } = useGetCartQuantity()

    const [state, setState] = useState({
        data: undefined,
        selectedItem: [],
        totalPrice: 0,
        isLoading: {
            type: '',
            status: false,
            id: '',
        },
        isLoadingDelete: false,
        quantity: 0,
    });

    const { isLoading, data, refetch, isError, error } = useGetCart();
    const { mutateAsync, isPending } = useDeleteItemCart();
    const { mutateAsync: updateMutaion, isPending: isUpdateLoading } = useUpdateItemCart();
    const checkoutMutation = useCheckout();
    const { setOrder } = useCheckoutStore()

    useEffect(() => {
        const quantity = data?.items?.reduce((total, item) => total += item?.quantity, 0);
        setState(prev => ({ ...prev, quantity: quantity }));
        dispatch(numOfCartPackage(data?.items?.length));
    }, [data])


    const handleCheckout = async () => {

        if (state?.selectedItem?.length === 0) {
            message.warning("Chọn sản phảm muốn thanh toán!");
            return;
        }

        checkoutMutation.mutateAsync(state?.selectedItem, {
            onSuccess: (data) => {
                const order = data?.order;
                const orderId = data?.order?.order_id;

                setOrder(order)
                navigate({ pathname: `/checkout/${orderId}` });
            },
            onError: (error) => {
                const response = error?.response?.data
                if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate('/login')
                } else {
                    notification.info({
                        message: 'Thông báo',
                        description: response?.message,
                    })
                    refetch();
                }
            }
        })
    };

    const handleSelectItem = (e, item) => {
        if (e.target.checked) {
            state.totalPrice += item?.price_per_item;
            state.selectedItem?.push(item)
        } else {
            state.totalPrice -= item?.price_per_item;
            state.selectedItem?.pop(item)
        }
        setState((prev) => ({ ...prev }));
    };

    const handleDeleteItem = (id) => {
        mutateAsync(id, {
            onSuccess: () => {
                refetch()
                getQuantity()
                const findItem = state.selectedItem.findIndex((item) => item?._id === id);
                if (findItem !== -1) {
                    const newTotalPrice = state?.totalPrice - state?.selectedItem[findItem]?.price_per_item;
                    const newSelected = state.selectedItem?.filter((_, index) => index !== findItem);

                    setState((prev) => ({
                        ...prev,
                        selectedItem: newSelected,
                        totalPrice: newTotalPrice,
                    }));
                }
                message.success(SUCCESS);
            },
            onError: (error) => {
                const response = error?.response?.data
                if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate('/login')
                } else {
                    message.error(FAIL);
                };
            }
        });
    };

    const handleUpdateItem = async (id, quantity, type) => {
        if (quantity === 0) return;

        if(quantity > 10) {
            message.info("Quá số lượng cho phép");
            return;
        }

        updateMutaion({ id, quantity }, {
            onSuccess: () => {
                refetch()
                const findItem = state.selectedItem.findIndex((item) => item?._id === id);
                if (findItem !== -1) {
                    let newTotalPrice;
                    if(type === "minus"){
                        newTotalPrice = state?.totalPrice - state?.selectedItem[findItem]?.price_per_one;
                    }else{
                        newTotalPrice = state?.totalPrice + state?.selectedItem[findItem]?.price_per_one;
                    }
                    // const newSelected = state.selectedItem?.filter((_, index) => index !== findItem);

                    setState((prev) => ({
                        ...prev,
                        // selectedItem: newSelected,
                        totalPrice: newTotalPrice,
                    }));
                }
                getQuantity()
            },
            onError: (error) => {
                const response = error?.response?.data
                if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate('/login');
                } else {
                    message.error(response?.message);
                };
            }
        });
    }

    return (
        <CartContainer isLoading={isLoading} isError={isError} error={error}>
            <>
                <CartHeader quantity={state.quantity} />
                <div
                    className="flex flex-col md:flex-row gap-4"
                >
                    <CartItems>
                        {
                            data?.items?.map((item) => {
                                return (
                                    <div key={item?._id}>
                                        <CartCard
                                            data={item}
                                            handleSelectItem={handleSelectItem}
                                            handleDeleteItem={handleDeleteItem}
                                            handleUpdateItem={handleUpdateItem}
                                            isLoadingDelete={isPending}
                                            isLoadingUpdate={isUpdateLoading}
                                        />
                                    </div>
                                )
                            })
                        }
                    </CartItems>
                    <CartCheckout
                        totalPrice={state.totalPrice}
                        isLoadingCheckout={checkoutMutation.isPending}
                        handleCheckout={handleCheckout}
                    />
                </div>
            </>
        </CartContainer>
    )
}

export default CartPage