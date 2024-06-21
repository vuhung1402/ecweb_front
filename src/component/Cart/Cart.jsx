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

const Cart = () => {
    const navigate = useNavigate();
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
        } else {
            if (cartItem?.message === TOKEN_INVALID) {
                logAgain();
                navigate("/login");
            }
        }
        setState((prev) => ({ ...prev }));
    }

    return (
        <div className=" px-8 mb-1">
            <div className=" flex flex-col items-center justify-center font-semibold text-5xl gap-2 p-5 border-b-[1px]">
                <div className=" font-semibold text-3xl">Giỏ hàng của bạn</div>
                <div className=" font-normal text-sm">Có 1 sản phẩm trong giỏ hàng của bạn</div>
                <span className="bg-black p-[1.5px] w-14"></span>
            </div>
            <div className=" flex p-4">
                <div className=" w-1/2 h-[500px] overflow-y-auto">
                    {
                        state.data?.items?.map((item) => {
                            return (
                                <CartCard data={item} />
                            )
                        })
                    }
                </div>
                <div className=" w-1/2 px-4 sticky">
                    <div className=" w-3/4 p-5 border">
                        <h1 className=" border-b-[1px] text-lg font-semibold py-3">Thông tin đơn hàng</h1>
                        <div className=" flex items-center justify-between border-b-[1px] py-3">
                            <p className=" font-bold">Tổng tiền:</p>
                            <p className=" text-red-600 font-semibold">{formatCurrencyVN(120000)}</p>
                        </div>
                        <div className=" text-sm py-3">
                            Phí vận chuyển sẽ được tính ở trang thanh toán.
                            Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                        </div>
                        <button className=" uppercase bg-red-600 w-full p-3 text-white">Thanh toán</button>
                        <div className=" flex text-sm items-center justify-center gap-1 text-blue-600 py-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                            <a>Tiếp tục mua hàng</a>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart