import React, { useEffect, useState } from "react";
import InforProduct from "./InforProduct";
import UploadImage from "./uploadImage";
import ColorInfo from "./ColorInfo";

const AddProduct = (props) => {

    const { color } = props;
    const { handleAddColor, handleAddSize, handleDeleteColor, handleDeleteSize } = props;

    const [state, setState] = useState({
        fileList: [],
        mainImage: '',
        hoverImage: '',
    });

    const handleExportData = (type, data) => {
        if (type === 'list') state.fileList = data;
        if (type === 'image') {
            state.hoverImage = data?.hoverImage;
            state.mainImage = data?.mainImage;
        };

        setState(prev => ({...prev}));
    };

    return (
        <div id="modal-product">
            <div className=" w-full">
                <InforProduct />
                <UploadImage
                    handleExportData={handleExportData}
                />
                <ColorInfo
                    color={color}
                    imageList={state.fileList}
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