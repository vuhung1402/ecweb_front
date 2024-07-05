import { formatCurrencyVN } from "@utils/function";
import React from "react";

const ProductCard = (props) => {
    const { data } = props;
    return(
        <div className="p-1 border rounded-lg flex justify-between">
            <div className=" flex items-center">
                <img className="h-[100px] w-[100px]" src={data?.image_hover} />
                <div className=" ml-3">
                    <a className=" mb-1 hover:text-blue-500" href="#">{data?.product_name}</a>
                    <div className=" mb-1 text-sm font-light">{data?.color}{data?.size ? `/${data?.size}` : ''}</div>
                    <div className=" flex items-center">
                        <span className="">Số lượng: {data?.quantity}</span>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col justify-between items-center">
                <div className=" font-semibold">{formatCurrencyVN(data?.price_per_one)}</div>
            </div>
        </div>
    )
}

export default ProductCard;