import Loading from "@widgets/Loading/Loading";
import React from "react";

const ProductsContainer = ({isGetCategories, ...props}) => {

    if(isGetCategories) return <Loading/>

    return(
        <div className="w-full h-full p-4" {...props}>

        </div>
    )
}

export default ProductsContainer