// ColorInfor.jsx

import React from "react";
import { Button, ColorPicker, Input } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import DeleteIcon from "@icon/deleteIcon.svg"
import PlusIcon from "@icon/plusIcon.svg"

const ColorInfo = (props) => {

    const { color } = props;
    const { handleAddColor, handleAddSize, handleDeleteColor, handleDeleteSize } = props;

    const onChange = (value, hex) => {
        console.log(value);
        console.log(hex);
    };

    return (
        <div id="color-info" className="flex mt-14 gap-3">
            <div className=" w-28">Màu</div>
            <div className="flex flex-col gap-3">
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    className="w-32"
                    onClick={handleAddColor}
                >
                    Thêm màu
                </Button>
                <div className="flex flex-col gap-3">
                    {color?.map((item, index) => {
                        return (
                            <>
                                <div className="flex gap-2 items-center" key={`color-${index}`}>
                                    <ColorPicker defaultValue="#1677ff" showText onChange={onChange} />
                                    <Input
                                        type=""
                                        placeholder="Tên màu"
                                        style={{
                                            width: '200px'
                                        }}
                                    />
                                    <div
                                        onClick={() => handleDeleteColor(item?._id)}
                                        className=" cursor-pointer"
                                    >
                                        <DeleteIcon />
                                    </div>
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => handleAddSize(item?._id)}
                                    >
                                        <PlusIcon />
                                    </div>
                                </div>
                                {item?.size?.length > 0 && item?.size?.map((itemSize, idx) => {
                                    return (
                                        <div className=" flex gap-3 items-center ml-10" key={`size-${idx}`}>
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
                                            <div
                                                onClick={() => handleDeleteSize(item?._id, itemSize?._id)} 
                                                className=" cursor-pointer"
                                            >
                                                <DeleteIcon />
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ColorInfo