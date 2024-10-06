import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logAgain } from "@utils/function";
import { useDispatch } from "react-redux";
import { numOfCartPackage } from "@redux/actions";
import { message } from "antd";

import CartCard from "@component/CartCard";
import CartContainer from "./CartContainer";
import CartHeader from "@_components/Cart/CartHeader";

import { useCheckout, useDeleteItemCart, useGetCart, useUpdateItemCart } from "./function";

import { checkout } from "./function";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { FAIL, SUCCESS } from "@utils/message";
import CartItems from "@_components/Cart/CartItems";
import CartCheckout from "@_components/Cart/CartCheckout";
import useGetCartQuantity from "@hooks/useGetCartQuantity";

const CartPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { getQuantity } = useGetCartQuantity()

    const [state, setState] = useState({
        data: undefined,
        selectedItem: [],
        totalPrice: 0,
        isLoading:{
            type: '',
            status: false,
            id: '',
        },
        isLoadingDelete: false,
        quantity: 0,
    });

    const { isLoading, data, refetch } = useGetCart();
    const { mutateAsync, isPending } = useDeleteItemCart();
    const { mutateAsync: updateMutaion, isPending: isUpdateLoading } = useUpdateItemCart();
    const checkoutMutation = useCheckout();

    useEffect(() => {
        const quantity = data?.items?.reduce((total, item) => total += item?.quantity,0);
        setState(prev => ({...prev, quantity: quantity}));
        dispatch(numOfCartPackage(data?.items?.length));
    },[data])


    const handleCheckout = async () => {
        checkoutMutation.mutateAsync(state?.selectedItem, {
            onSuccess: (data) => {
                const order = data?.order;
                const orderId = data?.order?.order_id;

                navigate({ pathname: `/checkout/${orderId}`}, { order: order });
            },
            onError: (error) => {
                const response = error?.response?.data
                if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate('/login')
                } else {
                    message.info("Chọn sản phảm muốn thanh toán!");
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
                if(findItem !== -1){
                    const newTotalPrice = state?.totalPrice - state?.selectedItem[findItem]?.price_per_item;
                    const newSelected = state.selectedItem?.filter((_, index) => index !== findItem);
                    
                    setState((prev) => ({
                        ...prev,
                        selectedItem: newSelected,
                        totalPrice:  newTotalPrice,
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

    const handleUpdateItem = async (id, quantity) => {
        if(quantity === 0) return;

        updateMutaion({ id, quantity }, {
            onSuccess: () => {
                refetch()
                getQuantity()
            },
            onError: (error) => {
                const response = error?.response?.data
                if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate('/login');
                } else {
                    message.error(FAIL);
                };
            }
        });
    }

    return(
        <CartContainer isLoading={isLoading}>
            <>
                <CartHeader quantity={state.quantity} />
                <div
                    className="flex flex-col md:flex-row gap-4"
                >
                    <CartItems>
                        {
                            data?.items?.map((item) => {
                                return (
                                    <CartCard
                                        data={item}
                                        handleSelectItem={handleSelectItem}
                                        handleDeleteItem={handleDeleteItem}
                                        handleUpdateItem={handleUpdateItem}
                                        isLoadingDelete={isPending}
                                        isLoadingUpdate={isUpdateLoading}
                                    />
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