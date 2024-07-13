import { formatCurrencyVN } from "@utils/function";
import { Image } from "antd";
import React from "react";

const CardProduct = (props) => {
    const { dataDetail } = props;

    return (
        <div className="w-[500px] h-[200px] border border-[#333] py-3 rounded-md flex gap-2 items-center">
            <div className="h-full flex flex-col justify-center px-2 rounded-md">
                <Image
                    // style={{
                    //     border: '1px solid #DDDDDD',
                    //     borderRadius: '5px'

                    // }}
                    width={150}
                    height={150}
                    src={dataDetail?.image_hover}
                />
            </div>
            <div className=" flex flex-grow flex-col gap-2 px-2">
                <div className=" font-medium">{dataDetail?.product_name}</div>
                <div>{dataDetail?.color}{dataDetail?.size ? `/${dataDetail?.size}` : ''}</div>
                <div>{formatCurrencyVN(dataDetail?.price_per_one)}</div>
                <div>Số lượng: {dataDetail?.quantity}</div>
                <div className=" flex justify-end text-red-600 font-medium text-2xl">{formatCurrencyVN(dataDetail?.price_per_item)}</div>
            </div>
        </div>
    )
}

export default CardProduct;