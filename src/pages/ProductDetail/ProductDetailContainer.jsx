import Loading from "@widgets/Loading/Loading";
import React from "react";

const ProductDetailContainer = ({isLoading, ...props}) => {

    if (isLoading) return <div className="w-full min-h-screen h-full flex items-center justify-center"><Loading /></div>

    return (
        <div className="w-full mb-5 px-10 me:px-[85px] pt-7" {...props} />
    );
};

export default ProductDetailContainer;