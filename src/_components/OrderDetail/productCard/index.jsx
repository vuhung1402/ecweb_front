import { formatCurrencyVN } from "@utils/function";
import React from "react";

const ProductCard = (props) => {
    const { data } = props;
    return(
        <div className="py-2 px-4 border-t flex justify-between">
            <div className="flex items-center gap-5">
                <img className="h-[100px] w-[100px]" src={data?.image_hover} />
                <div className="flex flex-col gap-2">
                    <a className="hover:text-blue-500 font-bold" href="#">{data?.product_name}</a>
                    <div className="text-sm font-bold opacity-50 italic">{data?.color}{data?.size ? `/${data?.size}` : ''}</div>
                    <div className="font-normal">Số lượng: <span className="font-bold">{data?.quantity}</span></div>
                </div>
            </div>
            <div className=" flex flex-col justify-between items-center">
                <div className="font-bold text-lg">{formatCurrencyVN(data?.price_per_one)}</div>
            </div>
        </div>
    )
}

export default ProductCard;