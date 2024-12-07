import React from "react";

const ProductContainer = (props) => {
    return (
        <div className="w-full h-full flex flex-col lg:flex-row" {...props} />
    );
};

export default ProductContainer;