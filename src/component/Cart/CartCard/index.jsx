import { formatCurrencyVN } from "@utils/function";
import React, { useEffect, useState } from "react";

const CartCard = (props) => {
    const { data } = props;

    const [state, setState] = useState({
        quantity:'',
    })

    useEffect(() => {
        state.quantity = data?.quantity;
        setState((prev) => ({ ...prev }))
    }, []);
    return (
        <div className="p-1 border-b-[1px] flex justify-between">
            <div className=" flex items-center">
                <img className="h-[100px] w-[100px]" src={data?.image_hover} />
                <div className=" ml-3">
                    <a className=" mb-1 hover:text-blue-500" href="#">{data?.product_name}</a>
                    <div className=" mb-1 text-sm font-light">{data?.color}/{data?.size}</div>
                    <div className=" flex items-center">
                        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 font-bold">
                            -
                        </button>
                        <span className=" px-4 bg-[#f5f5f5]">{state?.quantity}</span>
                        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 font-bold">
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col justify-between items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                <div className=" font-semibold">{formatCurrencyVN(data?.price_per_one)}</div>
            </div>
        </div>
    )
}

export default CartCard;