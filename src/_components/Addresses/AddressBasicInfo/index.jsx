import React from "react";

const AddressBasicInfo = ({ address }) => {
    return (
        <div className="p-3 flex flex-col gap-3 bg-[#fafafa] text-sm font-bold opacity-60">
            <div>{address?.name}</div>
            <div className="flex items-start">
                <p className="w-[40%]">Địa chỉ:</p>
                <p className="w-[60%] flex  flex-grow justify-start ">{address?.street}, {address?.wardName}, {address?.districtName}, {address?.provinceName}</p>
            </div>
            <div className="flex items-start">
                <p className="w-[40%]">Số điện thoại:</p>
                <p className="w-[60%] flex justify-start flex-grow">{address?.number}</p>
            </div>
        </div>
    )
}

export default AddressBasicInfo