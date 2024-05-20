import React, { useEffect } from "react";
import InforProduct from "./InforProduct";
import UploadImage from "./uploadImage";
import ColorInfo from "./ColorInfo";

const AddProduct = () => {
        const divsWithTabIndex = document.querySelectorAll('div[tabindex="-1"]');
        console.log(divsWithTabIndex);

    return (
        <div
            className=""
        >
            <div className=" w-full">
                <InforProduct />
                <UploadImage/>
                <ColorInfo/>
            </div>
        </div>
    )
}

export default AddProduct