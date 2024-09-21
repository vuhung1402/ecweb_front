import React from "react";

export const ProductSidebarWrapper = (props) => {
    return (
        <div className="w-full lg:w-1/4" {...props}/>
    );
};

export const ProductListWrapper = (props) => {
    return (
        <div className="flex flex-grow w-full overflow-y-auto" {...props}/>
    );
};