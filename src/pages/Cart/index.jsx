import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrencyVN, logAgain } from "@utils/function";
import { useDispatch } from "react-redux";
import { numOfCartPackage } from "@redux/actions";
import { Button, message } from "antd";
import { SwapRightOutlined } from "@ant-design/icons";

import CartCard from "@component/CartCard";
import Loading from "@component/Loading/Loading";

import { checkout, deleteItemCart, getCart, updateItemCart } from "./function";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { FAIL, SUCCESS } from "@utils/message";

const changeSizeRule = [
    'Sản phẩm được hỗ trợ đổi size trong vòng 3 ngày kể từ ngày nhận được hàng',
    'Sản phẩm còn đủ tem mác, phụ kiện đi kèm và chưa qua sử dụng, giặt ủi.',
    'Chỉ hỗ trợ đổi size 01 lần/đơn hàng',
    'Phí ship đổi size khách hàng sẽ thanh toán'
];

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

    const getData = async () => {
        const cartItem = await getCart();
        if (cartItem?.success) {
            const quantity = cartItem?.items?.reduce((total, item) => total += item?.quantity,0);
            setState((prev) => ({
                ...prev,
                data: cartItem,
                quantity: quantity,
            }));
            // state.data = cartItem;
            // state.quantity = quantity;
            dispatch(numOfCartPackage(cartItem?.items?.length))
        } else {
            if (cartItem?.message === TOKEN_INVALID || cartItem?.message === NOT_AUTHENTICATION) {
                logAgain();
                navigate("/login");
            }
        }
        // setState((prev) => ({ ...prev }));
    };

    useEffect(() => {
        getData();
    }, []);

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
        const result = await deleteItemCart(id);
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
        <div className="w-full h-full xl:max-w-[1600px] px-[15px] xl:px-[85px] mx-auto">
            {!state.data && (
                <div className="w-full h-full">
                    <Loading />
                </div>
            )}
            {state.data && (
                <>
                    <div className="w-full flex flex-col items-center justify-center font-semibold text-5xl gap-2 p-5">
                        <div className="font-semibold text-3xl text-center">Giỏ hàng của bạn</div>
                        <div className="font-semibold text-sm text-center opacity-60">{`Có ${state.quantity} sản phẩm trong giỏ hàng`}</div>
                        <span className="bg-black p-[1.5px] w-14"></span>
                    </div>
                    <div
                        className="flex flex-col md:flex-row gap-4"
                    >
                        <div className="w-full md:w-2/3 flex flex-col gap-3">
                            {state.data?.items?.length === 0 && <div className="">Giỏ hàng của bạn đang trống</div>}
                            {
                                state.data?.items?.map((item) => {
                                    return (
                                        <CartCard
                                            data={item}
                                            getData={getData}
                                            handleSelectItem={handleSelectItem}
                                            handleDeleteItem={handleDeleteItem}
                                            handleUpdateItem={handleUpdateItem}
                                            isLoadingDelete={state?.isLoadingDelete}
                                            isLoadingUpdate={state.isLoading}
                                        />
                                    )
                                })
                            }
                            <div className="font-bold opacity-60 w-fit flex flex-col gap-2 justify-end uppercase text-base">
                                <div className="">Chính sách đổi size</div>
                                <div className="flex flex-col gap-1">
                                    {changeSizeRule.map((item, index) => {
                                        return (
                                            <div
                                                className="text-xs opacity-70 flex items-center gap-2"
                                                key={`change-size-rule-${index}`}
                                            >
                                                <SwapRightOutlined />
                                                {item}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 md:pl-4 md:sticky">
                            <div className="w-full p-5 border">
                                <h1 className="border-b-[1px] text-xl font-bold pb-5 tracking-wide opacity-90">Thông tin đơn hàng</h1>
                                <div className="flex items-center justify-between border-b-[1px] py-3">
                                    <p className="font-bold opacity-80">Tổng tiền:</p>
                                    <p className="text-red-600 text-xl font-bold">{formatCurrencyVN(state.totalPrice)}</p>
                                </div>
                                <div className="text-sm py-3 font-semibold opacity-70">
                                    Phí vận chuyển sẽ được tính ở trang thanh toán.
                                    Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                                </div>
                                <Button
                                    onClick={() => handleCheckout("checkOut")}
                                    loading={state.isLoading.status && "checkOut" === state.isLoading.type}
                                    className="w-full mt-3 p-3 !h-auto font-medium uppercase text-xl"
                                    type="primary"
                                >
                                    Thanh toán
                                </Button>
                                <div className=" flex text-sm items-center justify-center gap-1 text-blue-600 py-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                    </svg>
                                    <div
                                        className=" cursor-pointer"
                                        onClick={() => navigate("/products/all")}
                                    >
                                        Tiếp tục mua hàng
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CartPage