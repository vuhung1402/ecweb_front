import Loading from "@widgets/Loading/Loading";
import useWindowSize from "@hooks/useWindowSize";
import React from "react";

export const ProductListWrapper = (props) => {

    const iw = useWindowSize().width;

    return (
        <div
            style={{
                height: iw > 640 ? 'calc(100vh - 120px)' : 'calc(100vh - 230px)'
            }}
            {...props}
        >

        </div>
    )
}

export const ActionWrraper = (props) => {
    return (
        <div
            className='flex flex-col 2xl:flex-row gap-3 items-center justify-end 2xl:justify-between mb-3 px-2'
            {...props}
        >

        </div>
    )
}

export const ProductActionWrapper = (props) => {
    return (
        <div
            className='flex flex-col sm:flex-row w-full sm:items-center gap-3 justify-end 2xl:justify-normal'
            {...props}
        >

        </div>
    )
}

export const DropDownSubCategoryWrapper = (props) => {
    return (
        <div
            className='w-full flex justify-end'
            {...props}
        >

        </div>
    )
}

export const NewProductWrapper = ({isGetProductDetail, ...props}) => {
    if (isGetProductDetail) return <Loading />

    return (
        <div
            className="px-3 sm:px-10 py-3 w-full h-full"
            {...props}
        >

        </div>
    )
}

export const NewProductActionWrapper = (props) => {
    return (
        <div
            className="w-full h-full flex flex-col gap-3"
            {...props}
        />
    )
}

export const AddProductWrapper = (props) => {

    const iw = useWindowSize().width;

    return (
        <div
            id="modal-product" className="flex flex-col w-full me:py-2" style={{ height: iw < 960 ? 'calc(100% - 44px)' : '100%' }}
            {...props}
        />
    )
}

export const InforProductWrapper = (props) => {
    return (
        <div
            className="w-full overflow-y-auto scrollbar-hide"
            {...props}
        />
    )
}

export const ConfirmButtonWrapper = (props) => {
    return (
        <div
            className=" flex gap-3 justify-end items-center mt-5"
            {...props}
        />
    )
}