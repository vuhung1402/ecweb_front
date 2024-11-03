import Loading from "@component/Loading/Loading";
import React from "react";

const ProductsContainer = (props) => {

    if(props?.isGetCategories) return <Loading/>

    return(
        <div className="w-full h-full p-4" {...props}>

        </div>
    )
}

export default ProductsContainer