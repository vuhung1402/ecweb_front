import React, { useEffect } from "react";
import InforProduct from "./InforProduct";

const AddProduct = () => {
        const divsWithTabIndex = document.querySelectorAll('div[tabindex="-1"]');
        console.log(divsWithTabIndex);

    return (
        <div
            className=" overflow-y-auto"
        >
            <div className=" w-full">
                <InforProduct />
            </div>
        </div>
    )
}

export default AddProduct