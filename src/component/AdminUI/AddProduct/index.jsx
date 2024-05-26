import React, { useEffect, useState } from "react";
import InforProduct from "./InforProduct";
import UploadImage from "./uploadImage";
import ColorInfo from "./ColorInfo";

const AddProduct = (props) => {
    const { color, imageList, idCategory, idSubCategory, category } = props;
    const { handleAddColor, handleAddSize, handleDeleteColor, handleDeleteSize, handleChangeInfo, handleExportData, handleEditColor } = props;
    const { handleEditSize, handleSelectCategory } = props

    return (
        <div id="modal-product">
            <div className=" w-full">
                <InforProduct 
                    handleChangeInfo={handleChangeInfo}
                    handleSelectCategory={handleSelectCategory}
                    idCategory={idCategory}
                    idSubCategory={idSubCategory}
                    category={category}
                />
                <UploadImage
                    handleExportData={handleExportData}
                />
                <ColorInfo
                    color={color}
                    imageList={imageList}
                    handleAddColor={handleAddColor}
                    handleAddSize={handleAddSize}
                    handleDeleteColor={handleDeleteColor}
                    handleDeleteSize = {handleDeleteSize}
                    handleEditColor = {handleEditColor}
                    handleEditSize = {handleEditSize}
                />
            </div>
        </div>
    )
}

export default AddProduct