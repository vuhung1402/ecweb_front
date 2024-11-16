import React from "react";
import { Button, Empty } from 'antd'

import Loading from "@widgets/Loading/Loading";

export const AddressesContainer = ({ isLoading, ...rest }) => {

    if (isLoading) return <Loading />

    return (
        <div className="w-full h-full bg-gray-50 overflow-y-auto" {...rest} />
    )
}

export const AddressesWrapper = (props) => {
    return (
        <div className="flex flex-col md:flex-row gap-8 w-full md:w-[750px] me:w-[970px] xl:w-[1170px] mx-auto" {...props} />
    )
}

export const AddressesInfoWrapper = (props) => {
    return (
        <div className="w-full me:w-3/4 px-5 flex flex-col me:flex-row gap-3" {...props} />
    )
}

export const AddressListWrapper = ({ address, ...rest }) => {
    if (!address || address?.length === 0) {
        return (
            <div className="w-full me:w-7/12">
                <Empty />
            </div>
        )
    }

    return (
        <div className="w-full me:w-7/12" {...rest} />
    )
}

export const AddAddressWrapper = ({ children, handleAddAddressClick }) => {
    return (
        <div className="w-full me:w-5/12 me:px-3">
            <div className="me:px-3 flex flex-col gap-3">
                <Button
                    onClick={handleAddAddressClick}
                    type="primary"
                    className="font-bold w-fit"
                    size="large"
                >
                    Nhập địa chỉ mới
                </Button>

                {children}
            </div>
        </div>
    )
}

export const AddressesTitle = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Thông tin địa chỉ</h1>
        </div>
    )
}