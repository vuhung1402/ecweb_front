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

export const SideBarWrapper = (props) => {
    return (
        <div
            className="md:w-1/4 px-5 md:px-0"
            {...props}
        />
    )
}

export const OrderInfoWrapper = (props) => {
    return (
        <div
            className="w-full md:w-3/4 h-full my-3"
            {...props}
        />
    )
}

export const ContentOrderInfoWrapper = (props) => {
    return (
        <div
            className="w-full h-full px-5 md:px-0"
            {...props}
        />
    )
}

export const BackWrapper = (props) => {
    return (
        <div
            className="mb-2 flex items-center gap-3 hover:bg-[rgb(219,219,219)] w-fit transition-colors duration-300 cursor-pointer py-1 px-2 rounded-md"
            {...props}
        />
    )
}

export const BackTitle = () => {
    return (
        <div className="text-sm font-semibold">Quay về</div>
    )
}

export const InforWrapper = (props) => {
    return (
        <div
            className="border rounded-md"
            {...props}
        />
    )
}

export const InforTitle = (props) => {
    return (
        <div className="h-fit flex items-center gap-6 mb-2 border-b px-5 py-2">
            <div className="text-lg font-bold uppercase">Chi tiết đơn hàng</div>
            <div className="font-bold italic text-sm opacity-60">{props?.order_date}</div>
        </div>
    )
}

export const UserInforWrapper = (props) => {
    return (
        <div
            className="flex flex-col me:grid me:grid-cols-3 px-5 gap-3 mb-2"
            {...props}
        />
    )
}

export const UserInforContentWrapper = (props) => {
    return (
        <div
            className="border rounded-md h-[200px]"
            {...props}
        />
    )
}

export const UserInforTitle = () => {
    return (
        <div className="w-full px-3 py-2 uppercase text-sm font-bold text-neutral-400 border-b">
            Thông tin khách hàng
        </div>
    )
}

export const UserInforDetailWrapper = (props) => {
    return (
        <div
            className="w-full"
            {...props}
        />
    )
}

export const AddressInforWrapper = (props) => {
    return (
        <div
            className="border rounded-md h-[200px]"
            {...props}
        />
    )
}

export const AddressInforTitle = () => {
    return (
        <div className="w-full px-3 py-2 uppercase text-sm font-bold text-neutral-400 border-b">
            Địa chỉ
        </div>
    )
}

export const AddressInforDetail = (props) => {
    return (
        <div className=" mt-2">
            {props?.street}, {props?.wardName}, {props?.districtName}, {props?.provinceName}
        </div>
    )
}

export const PaymentInforWrapper = (props) => {
    return (
        <div
            className="border rounded-md h-[200px]"
            {...props}
        />
    )
}

export const PaymentTitle = () => {
    return (
        <div className="w-full px-3 py-2 uppercase text-sm font-bold text-neutral-400 border-b">
            Thông tin thanh toán
        </div>
    )
}

export const PaymentMethodWrapper = (props) => {
    return (
        <div className="w-full px-5 mb-2" {...props} >
        </div>
    )
}

export const PaymentMethodContentWrapper = (props) => {
    return (
        <div className="border px-3 py-2 rounded-md text-sm flex flex-col gap-3" {...props} >
        </div>
    )
}

export const OrderId = (props) => {
    return (
        <div className="flex gap-3">
            <div className="font-medium w-28">Mã đơn hàng:</div>
            <div className="font-bold">{props?.id}</div>
        </div>
    )
}

export const PaymentMethod = (props) => {
    return (
        <div className="flex gap-3">
            <div className="font-medium w-28">Phương thức thanh toán:</div>
            <div className="font-bold text-green-500">{props?.paymentMethdod}</div>
        </div>
    )
}

export const PaymentUrl = (props) => {
    return (
        <div className="flex gap-3">
            <div className="font-medium w-28">Link thanh toán</div>
            <div className="font-bold text-green-500">{props?.paymentUrl}</div>
        </div>
    )
}

export const OrderStatusWrapper = (props) => {
    return (
        <div className="flex flex-col gap-3 mb-3" {...props}/>
    )
}

export const OrderActionWrapper = (props) => {
    return (
        <div className="flex gap-3 justify-end" {...props}/>
    )
}


