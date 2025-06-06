import React from "react";
import { Popconfirm } from "antd"
import { CloseOutlined } from '@ant-design/icons'

import IconUpdate from '@icon/iconUpdate.svg'

const AddressCardHeader = ({ address, onToggleUpdateAddress, isDeleteAddressPending, handleDeleteAddress }) => {
    return (
        <div className="bg-[#d9edf7] flex p-3 items-center justify-between">
            <div className="flex items-center gap-1 text-sm font-bold opacity-60">
                <p>{address?.name}</p>
                <span>{address?.isDefault && "(Địa chỉ mặc định)"}</span>
            </div>

            <div className="flex gap-2">
                <div
                    onClick={() => onToggleUpdateAddress(address?._id)}
                    className="cursor-pointer hover:text-blue-500"
                >
                    <IconUpdate />
                </div>

                <Popconfirm
                    title="Xoá địa chỉ"
                    description="Bạn muốn xoá địa chỉ này?"
                    cancelText="Huỷ"
                    okText="Xác nhận"
                    onConfirm={handleDeleteAddress}
                    okButtonProps={{
                        loading: isDeleteAddressPending,
                    }}
                >
                    <CloseOutlined className="cursor-pointer hover:text-blue-500" />
                </Popconfirm>
            </div>
        </div>
    )
}

export default AddressCardHeader