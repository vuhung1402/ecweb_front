import { formatCurrencyVN } from "@utils/function";
import { Badge } from "antd";
import React from "react";

const ProductCard = () => {
    return (
        <div className="p-1 border-b-[1px] flex justify-between">
            <div className=" flex items-center">
                <Badge count={1}>
                    <img className="h-[64px] w-[64px] border" src="https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/images%2Frc-upload-1717084950125-5?alt=media&token=e2e8a016-f3b3-40f4-a9d3-881f5599d908" />
                </Badge>
                <div className=" ml-3">
                    <div className=" mb-1">FEARLESS corduroy daily cap</div>
                    <div className=" mb-1 text-sm font-light">Đen/XL</div>
                </div>
            </div>
            <div className=" flex flex-col justify-center items-center">
                <div>{formatCurrencyVN(295000)}</div>
            </div>
        </div>
    )
}

export default ProductCard;