import React, { useState } from "react"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { endpoint } from "../../api/api"
import { Button, Input, Select } from "antd"

const UpdateAddress = (props) => {
    const { isLoading, name, number, street, isDefault, provinces, districts, wards, provinceID, districtID, wardCode } = props;
    const { handleSaveAddress, onChangeInfor, onSelectProvince, onSelectDistrict, onSelectWard } = props;

    return (
        <div className="p-3 flex flex-col gap-3 bg-[#fafafa]">
            <Input
                onChange={(e) => onChangeInfor(e.target.value, "name")}
                value={name}
                // className="p-3 text-sm outline-none"
                placeholder="Họ và tên"
            />

            <Input
                onChange={(e) => onChangeInfor(e.target.value, "number")}
                value={number}
                // className="p-3 text-sm outline-none"
                placeholder="Số điện thoại"
            />

            <Select
                showSearch
                value={provinceID}
                onSelect={onSelectProvince}
                placeholder='Tỉnh, Thành Phố'
                options={provinces?.map((item) => ({
                    label: item?.ProvinceName,
                    value: item?.ProvinceID,
                }))}
            />

            <Select
                showSearch
                value={districtID}
                placeholder='Quận, Huyện'
                onSelect={onSelectDistrict}
                options={districts?.map((item) => ({
                    label: item?.DistrictName,
                    value: item?.DistrictID,
                }))}
            />

            <Select
                showSearch
                value={wardCode}
                placeholder='Phường, Xã'
                onSelect={onSelectWard}
                options={wards?.map((item) => ({
                    label: item?.WardName,
                    value: item?.WardCode,
                }))}
            />

            <Input
                onChange={(e) => onChangeInfor(e.target.value, "street")}
                value={street}
                // className="p-3 text-sm outline-none"
                placeholder="tên đường, số nhà, phường/xã, quận/huyện, thành phố/tỉnh"
            />

            <div class="flex items-center">
                <input
                    onChange={(e) => onChangeInfor(e.target.checked, "isDefault")}
                    checked={isDefault}
                    id="default-checkbox"
                    type="checkbox"
                    value={isDefault}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 outline-none"
                />
                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Đặt làm địa chỉ mặc định</label>
            </div>

            <div className=" mt-5 flex items-center">
                <Button
                    onClick={handleSaveAddress}
                    loading={isLoading}
                    type="primary" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Cập nhật
                </Button>
                <div className=" ml-2">
                    <div className=" cursor-pointer mr-2">hoặc  <a className="hover:text-blue-500" >Huỷ</a></div>
                </div>
            </div>
        </div>
    )
}

export default UpdateAddress