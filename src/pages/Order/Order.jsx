import Loading from "@widgets/Loading/Loading";
import React from "react";

export const Title = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Lịch sử mua hàng</h1>
        </div>
    )
}

export const ContentWrapper = (props) => {
    return (
        <div
            className="flex flex-col md:flex-row gap-8 w-full md:w-[750px] me:w-[970px] xl:w-[1170px] mx-auto"
            {...props}
        />
    )
}

export const SildeBarWrapper = (props) => {
    return(
        <div className="md:w-1/4 px-5 md:px-0" {...props} />
    )
}

export const TabWrapper = (props) => {
    if(props?.isLoading) return <Loading/>
    return(
        <div className="w-full md:w-3/4 px-5 md:px-0 h-full" {...props} />
    )
}

export const TableWrapper = (props) => {
    return(
        <div className="w-full overflow-y-auto h-[400px]" {...props} />
    )
}
