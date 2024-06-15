import { formatCurrencyVN } from "@utils/function";
import { Image } from "antd";
import React from "react";

const CardProduct = () => {
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
                    src="https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/images%2Frc-upload-1717605926003-5?alt=media&token=209b858d-d1c6-4db1-8e88-d5c640b321e0"
                />
            </div>
            <div className=" flex flex-grow flex-col gap-2 px-2">
                <div className=" font-medium">Tên sản phẩm</div>
                <div>Màu/size</div>
                <div>{formatCurrencyVN(100000)}</div>
                <div>Số lượng: 5</div>
                <div className=" flex justify-end text-red-600 font-medium text-2xl">{formatCurrencyVN(500000)}</div>
            </div>
        </div>
    )
}

export default CardProduct;