import React from "react";

import Loading from "@component/Loading/Loading";

const ProductContainer = (props) => {

    if (props.isLoading) return <div className="w-full h-full"><Loading /></div>

    return (
        <div className="w-full h-full flex flex-col lg:flex-row" {...props} />
    );
};

export default ProductContainer;