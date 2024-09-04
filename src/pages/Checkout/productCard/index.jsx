import { formatCurrencyVN } from "@utils/function";
import { Badge } from "antd";
import React from "react";

const ProductCard = (props) => {
    const { data } = props;

    return (
        <div className="p-1 border-b-[1px] flex justify-between my-2">
            <div className=" flex items-center">
                <Badge count={data?.quantity}>
                    <img className="h-[64px] w-[64px] border" src={data?.image_hover} />
                </Badge>
                <div className=" ml-3">
                    <div className=" mb-1">{data?.product_name}</div>
                    <div className=" mb-1 text-sm font-light">{data?.color}/{data?.size}</div>
                </div>
            </div>
            <div className=" flex flex-col justify-center items-center">
                <div>{formatCurrencyVN(data?.price_per_one)}</div>
            </div>
        </div>
    )
}

export default ProductCard;