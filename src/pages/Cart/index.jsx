import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logAgain } from "@utils/function";
import { useDispatch } from "react-redux";
import { numOfCartPackage } from "@redux/actions";
import { message } from "antd";

import CartCard from "@component/CartCard";
import CartContainer from "./CartContainer";
import CartHeader from "@_components/Cart/CartHeader";

import { useDeleteItemCart, useGetCart } from "./function";

import { checkout, updateItemCart } from "./function";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { FAIL, SUCCESS } from "@utils/message";
import CartItems from "@_components/Cart/CartItems";
import CartCheckout from "@_components/Cart/CartCheckout";

const CartPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const { isLoading, data, isError } = useGetCart();
    const deleteItemCart = useDeleteItemCart();

    if (isError) {
        console.log({isError});
        console.log({data});
    }

    useEffect(() => {
        const quantity = data?.items?.reduce((total, item) => total += item?.quantity,0);
        setState(prev => ({...prev, quantity: quantity}));
        dispatch(numOfCartPackage(data?.items?.length));
    },[data])


    const handleCheckout = async (type) => {
        setState((prev) => ({
            ...prev,
            isLoading: {
                status: true,
                type,
            }
        }));
        const response = await checkout(state?.selectedItem);
        if(response?.success){
            navigate(
                {
                    pathname: `/checkout/${response?.order?.order_id}`
                },
                {
                    state: {
                        order: response?.order,
                    }
                }
            )
        }else {
            if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                logAgain();
                navigate('/login');
            } else {
                setState((prev) => ({
                    ...prev,
                    isLoading: {
                        status: false,
                        type: "",
                    }
                }))
                message.info("Chọn sản phảm muốn thanh toán!");
            }
        }
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

    const handleDeleteItem = async (id) => {
        console.log('delete');
        const result = deleteItemCart.mutateAsync(id)
        if (result?.success) {
            await getData();
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
        } else {
            if (result?.message === TOKEN_INVALID || result?.message === NOT_AUTHENTICATION) {
                logAgain();
                navigate('/login');
            } else {
                message.error(FAIL);
            }
        }
    };

    const handleUpdateItem = async (id, quantity, type) => {
        if(quantity === 0) return;
        // {
        //     "success": true,
        //     "message": "Cập nhật giỏ hàng thành công",
        //     "color": "text-green-500"
        // }
        setState((prev) => ({ 
            ...prev, 
            isLoading: {
                type: type,
                status: true,
                id,
            },
        }));

        const res = await updateItemCart(id, quantity);
        if(res?.success){
            await getData();
            setState((prev) => ({ 
                ...prev, 
                isLoading: {
                    type: "",
                    status: false,
                    id: "",
                } 
            }));
        }else{
            if (result?.message === TOKEN_INVALID || result?.message === NOT_AUTHENTICATION) {
                logAgain();
                navigate('/login');
            } else {
                message.error(FAIL);
                setState((prev) => ({ 
                    ...prev, 
                    isLoading: {
                        type: "",
                        status: false,
                        id: "",
                    } 
                }));
            }
        }
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
                                        // getData={getData}
                                        handleSelectItem={handleSelectItem}
                                        handleDeleteItem={handleDeleteItem}
                                        handleUpdateItem={handleUpdateItem}
                                        isLoadingDelete={state?.isLoadingDelete}
                                        isLoadingUpdate={state.isLoading}
                                    />
                                )
                            })
                        }
                    </CartItems>
                    <CartCheckout
                        totalPrice={state.totalPrice}
                        isLoadingCheckout={state.isLoading}
                    />
                </div>
            </>
        </CartContainer>
    )
}

export default CartPage