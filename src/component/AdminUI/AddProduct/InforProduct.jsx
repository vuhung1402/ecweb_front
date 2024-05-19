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
                    type=""
                    placeholder="Mã sản phẩm"
                    style={{
                        width: '400px'
                    }}
                />
            </div>

            <div className=" flex gap-3 items-center">
                <div className=" w-28">Tên sản phẩm</div>
                <Input
                    type=""
                    placeholder="Tên sản phẩm"
                    style={{
                        width: '400px'
                    }}
                />
            </div>

            <div className=" flex gap-3 items-center">
                <div className=" w-28 hide">Giá tiền</div>
                <InputNumber
                    style={{
                        width: '400px'
                    }}
                    formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value?.replace(/\VND\s?|(,*)/g, '')}
                // onChange={onChange}
                />
            </div>

            <div className=" flex gap-3 items-center w-full">
                <div className=" w-28">Mô tả</div>
                <div className=" flex flex-grow">
                    <TextEditor />
                </div>
            </div>
        </div>
    )
}

export default InforProduct