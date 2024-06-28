import { formatCurrencyVN } from "@utils/function";
import React from "react";

const ProductCard = () => {
    return (
        <div className="p-1 border-b-[1px] flex justify-between">
            <div className=" flex items-center">
                <img className="h-[64px] w-[64px] border" src="https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/Shirt%2Faothun_coton_olive.jpg?alt=media&token=0c83e73d-eff4-4b66-a4a3-272ad1d05c66" />
                <div className=" ml-3">
                    <a className=" mb-1 hover:text-blue-500" href="#">FEARLESS corduroy daily cap</a>
                    <div className=" mb-1 text-sm font-light">Đen/XL</div>
                    <span className=" border px-1 bg-[#f5f5f5]">1</span>
                </div>
            </div>
            <div className=" flex flex-col justify-center items-center">
                <div>{formatCurrencyVN(295000)}</div>
            </div>
        </div>
    )
}

export default ProductCard;