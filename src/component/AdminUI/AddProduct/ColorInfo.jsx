import { ColorPicker, Input } from "antd";
import React from "react";
import DeleteIcon from "@icon/deleteIcon.svg"
import PlusIcon from "@icon/plusIcon.svg"

const ColorInfo = () => {
    return (
        <div className=" flex mt-14 gap-3 items-center ">
            <div className=" w-28">Màu</div>
            <div className=" flex flex-col gap-2">
                <div className=" flex items-center gap-3">
                    <ColorPicker defaultValue="#1677ff" showText />
                    <Input
                        type=""
                        placeholder="Tên màu"
                        style={{
                            width: '200px'
                        }}
                    />
                    <div className=" cursor-pointer">
                        <DeleteIcon />
                    </div>
                    <div className=" cursor-pointer">
                        <PlusIcon />
                    </div>
                </div>
                <div className=" flex gap-3 items-center ml-10">
                    <Input
                        type=""
                        placeholder="Size"
                        style={{
                            width: '150px'
                        }}
                    />
                    <Input
                        type=""
                        placeholder="Số lượng"
                        style={{
                            width: '150px'
                        }}
                    />
                    <div className=" cursor-pointer">
                        <DeleteIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColorInfo