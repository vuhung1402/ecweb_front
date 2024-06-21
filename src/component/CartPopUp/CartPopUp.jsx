import { formatCurrencyVN } from "@utils/function"
import React from "react"
import { useNavigate } from "react-router-dom"

const CartPopUp = () => {
    const navigate = useNavigate();

    return(
        <div className=" cursor-default z-[999]">
            <div className=" uppercase text-base text-center font-semibold p-3 border-b-[1px]">Giỏ hàng</div>
            <div className="p-1 border-b-[1px] flex justify-between">
                <div className=" flex items-center">
                    <img className="h-[64px] w-[64px] border" src="https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/images%2Frc-upload-1717084950125-3?alt=media&token=2d8fc153-9580-45c0-94d9-8032c7ef35a8"/>
                    <div className=" ml-3">
                        <a className=" mb-1 hover:text-blue-500" href="#">FEARLESS corduroy daily cap</a>
                        <div className=" mb-1 text-sm font-light">Đen/XL</div>
                        <span className=" border px-1 bg-[#f5f5f5]">1</span>
                    </div>
                </div>
                <div className=" flex flex-col justify-between items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    <div>{formatCurrencyVN(295000)}</div>
                </div>
            </div>
            <div className=" flex items-center justify-between mt-3">
                <div className=" uppercase font-light leading-3">Tổng tiền:</div>
                <div className=" text-red-500">{formatCurrencyVN(295000)}</div>
            </div>
            <div className=" flex items-center justify-between my-4">
                <button onClick={() => navigate('/cart')} className=" uppercase bg-[#0d4cdd] p-3 text-white">Xem giỏ hàng</button>
                <button className="uppercase bg-[#0d4cdd] p-3 text-white">Thanh toán</button>
            </div>
        </div>
    )
}

export default CartPopUp