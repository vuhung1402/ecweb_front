import React from "react"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { useEffect, useState } from "react"
import { endpoint } from "../../api/api"
import { useNavigate } from "react-router-dom"
import { formatCurrencyVN, logAgain } from "@utils/function"
import CartCard from "./CartCard"
import { data } from "@pages/admin/user/mock"
import { getCart } from "./function"
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error"
import { useDispatch } from "react-redux"
import { quantityCart } from "@pages/product/function"
import { numOfCartPackage } from "@redux/actions"
import { Button } from "antd"

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        data: undefined,
        quantity: '',
    });

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const cartItem = await getCart();
        // state.data = cartItem;
        // setState((prev) => ({ ...prev }));
        if (cartItem?.success) {
            state.data = cartItem;
            dispatch(numOfCartPackage(cartItem?.items?.length))
        } else {
            if (cartItem?.message === TOKEN_INVALID) {
                logAgain();
                navigate("/login");
            }
        }
        setState((prev) => ({ ...prev }));
    }

    const handleCheckout = () => {
        navigate("/checkout/1");
    }

    return (
        <div className=" px-8 mb-1">
            <div className=" flex flex-col items-center justify-center font-semibold text-5xl gap-2 p-5 border-b-[1px]">
                <div className=" font-semibold text-3xl">Giỏ hàng của bạn</div>
                <span className="bg-black p-[1.5px] w-14"></span>
            </div>
            <div className=" flex p-4">
                <div className=" w-1/2 h-[500px] overflow-y-auto">
                    {state.data?.items?.length === 0 && <div className="">Giỏ hàng của bạn đang trống</div>}
                    {
                        state.data?.items?.map((item) => {
                            return (
                                <CartCard data={item} getData={getData} />
                            )
                        })
                    }
                </div>
                <div className=" w-1/2 px-4 sticky">
                    <div className=" w-3/4 p-5 border">
                        <h1 className=" border-b-[1px] text-lg font-semibold py-3">Thông tin đơn hàng</h1>
                        <div className=" flex items-center justify-between border-b-[1px] py-3">
                            <p className=" font-bold">Tổng tiền:</p>
                            <p className=" text-red-600 font-semibold">{formatCurrencyVN(state.data?.total_price)}</p>
                        </div>
                        <div className=" text-sm py-3">
                            Phí vận chuyển sẽ được tính ở trang thanh toán.
                            Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                        </div>
                        <Button
                            onClick={handleCheckout}
                            className=" w-full mt-3 p-4 !h-auto font-medium uppercase text-xl"
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
        </div>
    )
}

export default Cart