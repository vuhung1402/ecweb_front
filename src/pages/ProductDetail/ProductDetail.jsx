import { formatCurrencyVN } from "@utils/function";
import React from "react";

export const ProductDetailWrapper = (props) => {
    return (
        <div className="w-full max-w-[1600px] px-10 mx-auto h-full flex flex-col me:flex-row" {...props} />
    );
};

export const ImagePreviewWrapper = (props) => {
    return (
        <div className="w-full me:w-[55%] me:min-w-1/2 h-full flex gap-3" {...props} />
    );
};

export const InfoProductWrapper = (props) => {
    return (
        <div className="my-[20px] flex flex-col gap-6 flex-1" {...props}/>
    );
};

export const SmallImageWrapper = (props) => {
    return (
        <div className="hidden me:flex flex-col gap-3 sticky top-20 h-fit" {...props}/>
    );
};

export const BigImageWrapper = (props) => {
    return (
        <div className="hidden me:flex flex-col gap-3 flex-grow px-6" {...props}/>
    );
};

export const InfoProductDetailHeader = (props) => {
    return (
        <>
            <div className="text-3xl font-bold py-3 border-b-[1px]">{props?.name}</div>
            <div className="text-red-500 text-3xl font-bold opacity-[0.92] border-b-[1px] py-3">{formatCurrencyVN(props?.price)}</div>
        </>
    );
};

export const InfoProductDetailColor = (props) => {

    if (props.length === 0) return null

    return (
        <div {...props} />
    );
};

export const InfoProductDetailColorName = ({colorName, ...props}) => {
    return (
        <div className="text-sm font-semibold text-gray-900 my-3" {...props}>Màu sắc: {colorName}</div>
    );
};