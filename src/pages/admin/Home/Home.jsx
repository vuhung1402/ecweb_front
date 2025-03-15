import React from "react";

export const TotalWrapper = (props) => {
    return (
        <div className=" flex" {...props}>

        </div>
    )
}

export const TotalItemWrapper = (props) => {
    return (
        <div className="flex flex-col border-solid border-l-[5px] border-[#0052cc] pl-2" {...props}>

        </div>
    )
}

export const TitleTotalUser = (props) => {
    return (
        <p className="text-[17px] mb-3">Tổng số người dùng</p>
    )
}

export const TitleTotalRevenue = (props) => {
    return (
        <p className="text-[17px] mb-3">Tổng doanh thu</p>
    )
}

export const TitleTotalProduct = (props) => {
    return (
        <p className="text-[17px] mb-3">Tổng sản phẩm</p>
    )
}

export const TitleTotalOrder = (props) => {
    return (
        <p className="text-[17px] mb-3">Tổng đơn hàng</p>
    )
}

export const IconWrraper = (props) => {
    return (
        <span
            className=" border-[1px] rounded-[100%] border-solid w-[60px] h-[60px] bg-[#e5e7eb] flex items-center justify-center text-[#0052cc]"
            {...props}
        />
    )
}

export const ChartWrapper = (props) => {
    return (
        <div className=" mt-4" {...props}>

        </div>
    )
}

export const ChartTitle = (props) => {
    return (
        <div className=" font-bold text-[20px] p-2 text-[#0052cc]">
            Biểu đồ doanh thu theo năm :
        </div>
    )
}

