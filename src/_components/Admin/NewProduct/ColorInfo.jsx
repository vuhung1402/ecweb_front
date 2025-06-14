// ColorInfor.jsx

import React, { useEffect } from "react";
import { Button, ColorPicker, Input } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import DeleteIcon from "@icon/deleteIcon.svg"
import PlusIcon from "@icon/plusIcon.svg"
import SelectImage from "@widgets/SelectImage";

const ColorInfo = (props) => {

    const { color, imageList, colorUid } = props;
    const { handleAddColor, handleAddSize, handleDeleteColor, handleDeleteSize, handleEditColor, handleEditSize } = props;

    useEffect(() => {
        const element = document.getElementById('endRef');
        element.scrollIntoView({ behavior: "smooth" });
    }, [color?.length, color?.[colorUid]?.array_sizes?.length])

    return (
        <div id="color-info" className="flex flex-col sm:flex-row mt-14 gap-3 font-bold w-full">
            <div className="w-32 min-w-32">Màu</div>
            <div className="flex flex-col gap-3 w-full">
                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    className="w-32"
                    onClick={handleAddColor}
                >
                    Thêm màu
                </Button>
                <div className="flex flex-col gap-3 w-full">
                    {color?.map((item, index) => {
                        return (
                            <div key={`color-${index}`} className="flex flex-col gap-2">
                                <div>
                                    <div className="flex items-center gap-2">
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
                                            onChange={(e) => handleEditColor(Number(e.target.value), item?._id, 'total_number_with_color')}
                                            type=""
                                            placeholder="Số lượng"
                                            style={{
                                                width: '60px'
                                            }}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <SelectImage
                                            colorId={item?._id}
                                            imageList={imageList}
                                            imageUid={item?.image?.uid}
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
                                                    width: '100px'
                                                }}
                                            />
                                            <Input
                                                value={itemSize?.total_number_with_size}
                                                onChange={(e) => handleEditSize(e.target.value, item?._id, itemSize?._id, 'total_number_with_size')}
                                                type=""
                                                placeholder="Số lượng"
                                                style={{
                                                    width: '100px'
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
                            </div>
                        )
                    })}
                    <div id='endRef' className=" h-1 w-full"></div>
                </div>
            </div>
        </div>
    )
}

export default ColorInfo