import Loading from "@widgets/Loading/Loading";
import React from "react";

export const ProductSidebarWrapper = (props) => {
    return (
        <div className="w-full lg:w-1/4" {...props}/>
    );
};

export const ProductListWrapper = (props) => {
    if (props?.isLoading) return <div className="w-full h-full"><Loading /></div>

    return (
        <div className="flex flex-grow w-full overflow-y-auto" {...props}/>
    );
};