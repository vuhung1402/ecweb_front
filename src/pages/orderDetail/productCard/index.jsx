import { formatCurrencyVN } from "@utils/function";
import React from "react";

const ProductCard = () => {
    return(
        <div className="p-1 border rounded-lg flex justify-between">
            <div className=" flex items-center">
                <img className="h-[100px] w-[100px]" src={"https://product.hstatic.net/200000691337/product/do_1_04ec3aef240c4425b91e438d4835916c_master.jpg"} />
                <div className=" ml-3">
                    <a className=" mb-1 hover:text-blue-500" href="#">{"FEARLESS basic hoodie"}</a>
                    <div className=" mb-1 text-sm font-light">{"data?.color"}/{"data?.size"}</div>
                    <div className=" flex items-center">
                        <span className="">Số lượng: {"state?.quantity"}</span>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col justify-between items-center">
                <div className=" font-semibold">{formatCurrencyVN(10000)}</div>
            </div>
        </div>
    )
}

export default ProductCard;