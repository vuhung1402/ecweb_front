import { Button, Checkbox, Input, Select } from "antd"
import React from "react"

const AddressUpdateCard = (props) => {

    const { addressInfo, wards, provinces, districts, updateAddressPending } = props
    const { onSelectProvince, onSelectDistrict, onSelectWard, onChangeInfo, onToggleUpdateAddress, onUpdateAddress } = props

    return (
        <div className="p-3 flex flex-col gap-3 bg-[#fafafa] text-sm">
            <Input
                type=""
                placeholder="Họ và tên"
                value={addressInfo.name}
                onChange={(e) => onChangeInfo(e.target.value, "name")}
                />

            <Input
                type=""
                placeholder="Số điện thoại"
                value={addressInfo.number}
                onChange={(e) => onChangeInfo(e.target.value, "number")}
            />

            <Select
                showSearch
                optionFilterProp="label"
                placeholder="Tỉnh, Thành Phố"
                value={addressInfo.provinceName}
                onSelect={onSelectProvince}
                options={provinces?.map((item) => ({
                    label: item?.ProvinceName,
                    value: item?.ProvinceID,
                }))}
            />

            <Select
                showSearch
                optionFilterProp="label"
                placeholder="Quận, Huyện"
                value={addressInfo.districtName}
                onSelect={onSelectDistrict}
                options={districts?.map((item) => ({
                    label: item?.DistrictName,
                    value: item?.DistrictID,
                }))}
            />

            <Select
                showSearch
                optionFilterProp="label"
                value={addressInfo.wardName}
                placeholder="Phường, Xã"
                onSelect={onSelectWard}
                options={wards?.map((item) => ({
                    label: item?.WardName,
                    value: item?.WardCode,
                }))}
            />

            <Input
                type=""
                value={addressInfo.street}
                onChange={(e) => onChangeInfo(e.target.value, "street")}
                placeholder="tên đường, số nhà, phường/xã, quận/huyện, thành phố/tỉnh"
            />

            <div className="flex items-center gap-2">
                <Checkbox
                    checked={addressInfo.isDefault}
                    onChange={(e) => onChangeInfo(e.target.checked, 'isDefault')}
                />
                
                <label className="text-sm">Đặt làm địa chỉ mặt định</label>
            </div>

            <div className="mt-5 flex items-center">
                <Button
                    onClick={onUpdateAddress}
                    loading={updateAddressPending}
                    type="primary"
                    className="font-bold"
                >
                    Cập nhật
                </Button>
                <div className="ml-2">
                    <div className="cursor-pointer mr-2">
                        {`hoặc `}
                        <a
                            onClick={() => onToggleUpdateAddress('')}
                            className="hover:text-blue-500 font-bold opacity-60"
                        >
                            Huỷ
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddressUpdateCard