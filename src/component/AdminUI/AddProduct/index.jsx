import React, { useEffect, useRef, useState } from "react";
import InforProduct from "./InforProduct";
import UploadImage from "./uploadImage";
import ColorInfo from "./ColorInfo";
import { Button } from "antd";

const AddProduct = React.forwardRef((props, ref) => {
    const { color, imageList, idCategory, idSubCategory, category, code, name, price, description, total, colorUid, addLoading, hoverImage, mainImage } = props;
    const { handleAddColor, handleAddSize, handleDeleteColor, handleDeleteSize, handleChangeInfo, handleExportData, handleEditColor } = props;
    const { handleEditSize, handleSelectCategory, onOk, onCancel } = props

    return (
        <div id="modal-product" className="flex flex-col w-full h-full">
            <div className="w-full overflow-y-auto scrollbar-hide">
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
                    mainImage={mainImage}
                    hoverImage={hoverImage}
                    imageList = {imageList}
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
                {/* <Button
                    onClick={onCancel}
                >
                    QUAY LẠI
                </Button> */}
                <Button
                    onClick={onOk}
                    loading={addLoading}
                    type="primary"
                    className="font-bold"
                >
                    XÁC NHẬN
                </Button>
            </div>
        </div>
    )
})

export default AddProduct