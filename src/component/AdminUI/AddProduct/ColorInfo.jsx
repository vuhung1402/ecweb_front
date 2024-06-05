// ColorInfor.jsx

import React, { useEffect, useRef, useState } from "react";
import { Button, ColorPicker, Input } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import DeleteIcon from "@icon/deleteIcon.svg"
import PlusIcon from "@icon/plusIcon.svg"
import SelectImage from "@component/SelectImage";

const ColorInfo = (props) => {

    const { color, imageList, colorUid } = props;
    const { handleAddColor, handleAddSize, handleDeleteColor, handleDeleteSize, handleEditColor, handleEditSize } = props;

    useEffect(() => {
        const element = document.getElementById('endRef');
        element.scrollIntoView({ behavior: "smooth" });
    }, [color?.length, color?.[colorUid]?.array_sizes?.length])

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
                                    <ColorPicker
                                        value={item?.code_color}
                                        showText
                                        onChange={(value, hex) => handleEditColor(hex, item?._id, 'code_color')}
                                    />
                                    <Input
                                        value={item?.name_color}
                                        onChange={(e) => handleEditColor(e.target.value, item?._id, 'name_color')}
                                        type=""
                                        placeholder="Tên màu"
                                        style={{
                                            width: '100px'
                                        }}
                                    />
                                    <Input
                                        value={item?.total_number_with_color}
                                        onChange={(e) => handleEditColor(e.target.value, item?._id, 'total_number_with_color')}
                                        type=""
                                        placeholder="Số lượng"
                                        style={{
                                            width: '100px'
                                        }}
                                    />
                                    <SelectImage
                                        colorId={item?._id}
                                        imageList={imageList}
                                        onSelectImage={handleEditColor}
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
                                {item?.array_sizes?.length > 0 && item?.array_sizes?.map((itemSize, idx) => {
                                    return (
                                        <div className=" flex gap-3 items-center ml-10" key={`size-${idx}`}>
                                            <Input
                                                value={itemSize?.name_size}
                                                onChange={(e) => handleEditSize(e.target.value, item?._id, itemSize?._id, 'name_size')}
                                                type=""
                                                placeholder="Size"
                                                style={{
                                                    width: '150px'
                                                }}
                                            />
                                            <Input
                                                value={itemSize?.total_number_with_size}
                                                onChange={(e) => handleEditSize(e.target.value, item?._id, itemSize?._id, 'total_number_with_size')}
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
                    <div id='endRef' className=" h-1 w-full"></div>
                </div>
            </div>
        </div>
    )
}

export default ColorInfo