import { Button } from "antd";
import React from "react";

import ColorInfo from "./ColorInfo";
import InforProduct from "./InforProduct";
import UploadImage from "./uploadImage";

import { AddProductWrapper, ConfirmButtonWrapper, InforProductWrapper } from "@pages/admin/products/Products";

const AddProduct = React.forwardRef((props, ref) => {
    const { color, imageList, idCategory, idSubCategory, code, name, price, description, total, colorUid, hoverImage, mainImage, pendingAddProduct, pendingUpdateProduct } = props;
    const { handleAddColor, handleAddSize, handleDeleteColor, handleDeleteSize, handleChangeInfo, handleExportData, handleEditColor } = props;
    const { handleEditSize, handleSelectCategory, onOk } = props

    return (
        <AddProductWrapper>
            <InforProductWrapper>
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
                />
                <UploadImage
                    mainImage={mainImage}
                    hoverImage={hoverImage}
                    imageList={imageList}
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
            </InforProductWrapper>
            <ConfirmButtonWrapper>
                <Button
                    onClick={onOk}
                    loading={pendingUpdateProduct || pendingAddProduct}
                    type="primary"
                    className="font-bold"
                >
                    XÁC NHẬN
                </Button>
            </ConfirmButtonWrapper>
        </AddProductWrapper>
    )
})

export default AddProduct