import TextEditor from "@component/TextEditor";
import { Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const InforProduct = () => {


    return (
        <div className=" w-full flex flex-col gap-4">
            <div className=" flex gap-3 items-center">
                <div className=" w-28">Mã sản phẩm</div>
                <Input
                    placeholder="Mã sản phẩm"
                    style={{
                        width: '400px'
                    }}
                />
            </div>

            <div className=" flex gap-3 items-center">
                <div className=" w-28">Tên sản phẩm</div>
                <Input
                    placeholder="Tên sản phẩm"
                    style={{
                        width: '400px'
                    }}
                />
            </div>

            <div className=" flex gap-3 items-center">
                <div className=" w-28">Giá tiền</div>
                <InputNumber
                    style={{
                        width: '400px'
                    }}
                    formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value?.replace(/\VND\s?|(,*)/g, '')}
                    // onChange={onChange}
                />
            </div>

            <div className=" flex gap-3 items-center">
                <div className=" w-28">Mô tả</div>
                <TextEditor/>
            </div>
        </div>
    )
}

export default InforProduct