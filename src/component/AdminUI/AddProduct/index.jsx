import React from "react";
import { Button } from "antd";

import InforProduct from "./InforProduct";
import UploadImage from "./uploadImage";
import ColorInfo from "./ColorInfo";

import useWindowSize from "@hooks/useWindowSize";

const AddProduct = React.forwardRef((props, ref) => {
    const { color, imageList, idCategory, idSubCategory, code, name, price, description, total, colorUid, addLoading, hoverImage, mainImage } = props;
    const { handleAddColor, handleAddSize, handleDeleteColor, handleDeleteSize, handleChangeInfo, handleExportData, handleEditColor } = props;
    const { handleEditSize, handleSelectCategory, onOk } = props

    const iw = useWindowSize().width;

    return (
        <div id="modal-product" className="flex flex-col w-full me:py-2" style={{height: iw < 960 ? 'calc(100% - 44px)' : '100%'}}>
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