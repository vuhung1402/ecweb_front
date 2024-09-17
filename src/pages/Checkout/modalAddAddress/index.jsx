import { HomeOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Modal, Select } from "antd";
import React from "react";

const ModalAddAddress = (props) => {
    const { isOpen, name, number, provinces, provinceID, districts, districtID, wards, wardCode, street, isDefault } = props;
    const { handleInsertAddress, onChangeInfor, onSelectProvince, onSelectDistrict, onSelectWard, handleAddAddress } = props;

    return (
        <div className=" flex flex-col gap-3">
            <Modal
                title="Địa chỉ"
                open={isOpen}
                onCancel={handleInsertAddress}
                onOk={handleAddAddress}
            >
                <Input
                    value={name}
                    type=""
                    className="text-sm outline-none border"
                    onChange={(e) => onChangeInfor(e.target.value, 'name')}
                    placeholder="Họ và tên"
                    prefix={<UserOutlined className="opacity-60" />}
                    classNames={{
                        input: '!px-2'
                    }}
                />

                <Input
                    value={number}
                    type=""
                    className="text-sm outline-none border"
                    onChange={(e) => onChangeInfor(e.target.value, 'phone')}
                    placeholder="Số điện thoại"
                    prefix={<PhoneOutlined className="opacity-60" />}
                    classNames={{
                        input: '!px-2'
                    }}
                />

                <Select
                    showSearch
                    optionFilterProp="label"
                    value={provinceID}
                    onSelect={onSelectProvince}
                    placeholder='Tỉnh, Thành Phố'
                    options={provinces?.map((item) => ({
                        label: item?.ProvinceName,
                        value: item?.ProvinceID,
                    }))}
                    suffixIcon={<HomeOutlined />}
                />

                <Select
                    showSearch
                    optionFilterProp="label"
                    suffixIcon={<HomeOutlined />}
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
                    optionFilterProp="label"
                    suffixIcon={<HomeOutlined />}
                    value={wardCode}
                    placeholder='Phường, Xã'
                    onSelect={onSelectWard}
                    options={wards?.map((item) => ({
                        label: item?.WardName,
                        value: item?.WardCode,
                    }))}
                />

                <Input
                    value={street}
                    type=""
                    prefix={<HomeOutlined className="opacity-60" />}
                    className="text-sm outline-none border"
                    classNames={{
                        input: '!px-2'
                    }}
                    onChange={(e) => onChangeInfor(e.target.value, 'street')}
                    placeholder="tên đường, số nhà"
                />

                <div class="flex items-center mb-2">
                    <input
                        value={isDefault}
                        onChange={(e) => onChangeInfor(e.target.checked, 'isDefault')}
                        id="default-checkbox"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 outline-none cursor-pointer"
                    />
                    <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Đặt làm địa chỉ mặc định</label>
                </div>
            </Modal>
        </div>
    )
}

export default ModalAddAddress