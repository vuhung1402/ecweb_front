import React, { useEffect } from "react";
import InforProduct from "./InforProduct";
import UploadImage from "./uploadImage";
import ColorInfo from "./ColorInfo";

const AddProduct = (props) => {

    const { color } = props;
    const { handleAddColor, handleAddSize, handleDeleteColor, handleDeleteSize } = props;

    return (
        <div id="modal-product">
            <div className=" w-full">
                <InforProduct />
                <UploadImage/>
                <ColorInfo
                    color={color}
                    handleAddColor={handleAddColor}
                    handleAddSize={handleAddSize}
                    handleDeleteColor={handleDeleteColor}
                    handleDeleteSize = {handleDeleteSize}
                />
            </div>
        </div>
    )
}

export default AddProduct