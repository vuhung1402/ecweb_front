import React, { useEffect, useRef, useState } from "react";
import InforProduct from "./InforProduct";
import UploadImage from "./uploadImage";
import ColorInfo from "./ColorInfo";
import { Button } from "antd";

const AddProduct = React.forwardRef((props, ref) => {
    const { color, imageList, idCategory, idSubCategory, category, code, name, price, description, total, colorUid, addLoading } = props;
    const { handleAddColor, handleAddSize, handleDeleteColor, handleDeleteSize, handleChangeInfo, handleExportData, handleEditColor } = props;
    const { handleEditSize, handleSelectCategory, onOk, onCancel } = props

    const handleScroll = (id) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    return (
        <div
            id="modal-product"
            className="flex gap-10"
        >
            <div className=" w-[292px] border-r-[1px] flex flex-col gap-3">
                <div
                    className=" cursor-pointer w- w-full h-6 hover:text-blue-500 font-bold"
                    onClick={() => handleScroll('infor-product')}
                >
                    Thông tin cơ bản
                </div>
                <div
                    className=" cursor-pointer hover:text-blue-500 font-bold"
                    onClick={() => handleScroll('upload-image')}
                >
                    Hình ảnh sản phẩm
                </div>
                <div
                    className=" cursor-pointer hover:text-blue-500 font-bold"
                    onClick={() => handleScroll('color-info')}
                >
                    Phân loại sản phẩm
                </div>
            </div>
            <div className=" flex flex-col">
                <div
                    style={{
                        height: 'calc(100vh - 131px)'
                    }}
                    className=" w-full overflow-y-auto scrollbar-hide"
                >
                    <InforProduct
                        description={description}
                        total={total}
                        price={price}
                        code={code}
                        name={name}
                        handleChangeInfo={handleChangeInfo}
                        handleSelectCategory={handleSelectCategory}
                        idCategory={idCategory}
                        idSubCategory={idSubCategory}
                    // category={category}
                    />
                    <UploadImage
                        ref={ref}
                        handleExportData={handleExportData}
                    />
                    <ColorInfo
                        colorUid={colorUid}
                        color={color}
                        imageList={imageList}
                        handleAddColor={handleAddColor}
                        handleAddSize={handleAddSize}
                        handleDeleteColor={handleDeleteColor}
                        handleDeleteSize={handleDeleteSize}
                        handleEditColor={handleEditColor}
                        handleEditSize={handleEditSize}
                    />
                </div>
                <div className=" flex gap-3 justify-end items-center mt-5">
                    <Button onClick={onCancel}>QUAY LẠI</Button>
                    <Button onClick={onOk} loading={addLoading} type="primary" >XÁC NHẬN</Button>
                </div>
            </div>
        </div>
    )
})

export default AddProduct