import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Input, message, Modal, Select } from "antd";
import { HomeOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";

import { getDistricts, getWards, logAgain } from "@utils/function";
import { useInsertAddress } from "@pages/Addresses/function";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";

const inputField = [
    {
        title: 'name',
        placeholder: 'Họ và tên',
        icon: <UserOutlined className="text-[#1890ff]" />
    },
    {
        title: 'phone',
        placeholder: 'Số điện thoại',
        icon: <PhoneOutlined className="text-[#1890ff]" />
    },
]

const ModalAddAddress = (props) => {

    const navigate = useNavigate();

    const { open, provinces } = props
    const { handleInsertAddress, refetch } = props

    const [state, setState] = useState({
        name : '',
        phone: '',
        street: '',
        provinceID: '',
        provinceName: '',
        districts: [],
        districtID: '',
        districtName: '',
        wards: [],
        wardID: '',
        wardName: '',
        isDefault: false
    })

    const { mutate, isPending } = useInsertAddress()

    const handleChangeState = (value, key) => {
        setState(prev => ({...prev,
            [key]: value
        }))
    }

    const handleSelectProvince = async (value, option) => {
        const response = await getDistricts(value);
        if (response?.code === 200) {
            setState((prev) => ({
                ...prev,
                districts: response?.data,
                provinceID: value,
                provinceName: option?.label,
                districtID: '',
                districtName: '',
                wardID: '',
                wardName: ''
            }))
        }
    }

    const handleSelectDistrict = async (value, option) => {
        setState((prev) => ({ ...prev, districtID: value, districtName: option?.label }));
        const response = await getWards(value);
        if (response?.code === 200) {
            setState((prev) => ({ ...prev, wards: response?.data }));
        }
    }

    const handleSelectWard = async (value, option) => {
        setState((prev) => ({ ...prev, wardID: value, wardName: option?.label }))
    }

    const handleAddAddress = async () => {
        const body = {
            name: state.name,
            street: state.street,
            provinceID: state.provinceID,
            provinceName: state.provinceName,
            districtID: state.districtID,
            districtName: state.districtName,
            wardCode: state.wardCode,
            wardName: state.wardName,
            number: state.phone,
            isDefault: state.isDefault,
        }

        mutate(body, {
            onSuccess: (res) => {
                message.success(res?.message)
                refetch()
                handleInsertAddress()
            },
            onError: (error) => {
                const response = error?.response?.data
                if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate('/login')
                } else {
                    message.error(response?.message);
                }
            }
        })
    }

    return (
        <div className="flex justify-center items-center p-5">
            <Modal
                open={open}
                title="Địa chỉ"
                cancelText="Hủy"
                okText="Thêm địa chỉ"
                className="w-[400px] rounded-lg"
                classNames={{
                    body: 'flex flex-col gap-4'
                }}
                confirmLoading={isPending}
                onCancel={handleInsertAddress}
                onOk={handleAddAddress}
            >

                <div className="flex flex-col gap-4">
                    {
                        inputField.map((item, index) => {
                            return (
                                <div key={`modal-address-${index}`}>
                                    <Input
                                        prefix={item.icon}
                                        value={state[item.title]}
                                        placeholder={item.placeholder}
                                        onChange={(e) => handleChangeState(e.target.value, item.title)}
                                    />
                                </div>
                            )
                        })
                    }
                </div>

                <div className="flex flex-col justify-center gap-4">
                    <Select
                        showSearch
                        optionFilterProp="label"
                        value={state.provinceID}
                        onSelect={handleSelectProvince}
                        options={provinces?.map((item) => ({
                            label: item?.ProvinceName,
                            value: item?.ProvinceID,
                        }))}
                        placeholder="Tỉnh, Thành Phố"
                        suffixIcon={<HomeOutlined className="text-[#1890ff]" />}
                    />

                    <Select
                        showSearch
                        optionFilterProp="label"
                        value={state.districtID}
                        onSelect={handleSelectDistrict}
                        options={state.districts?.map((item) => ({
                            label: item?.DistrictName,
                            value: item?.DistrictID,
                        }))}
                        placeholder="Quận, Huyện"
                        suffixIcon={<HomeOutlined className="text-[#1890ff]" />}
                    />

                    <Select
                        showSearch
                        optionFilterProp="label"
                        value={state.wardID}
                        onSelect={handleSelectWard}
                        options={state.wards?.map((item) => ({
                            label: item?.WardName,
                            value: item?.WardCode,
                        }))}
                        placeholder="Phường, Xã"
                        suffixIcon={<HomeOutlined className="text-[#1890ff]" />}
                    />
                </div>

                <Input
                    value={state.street}
                    onChange={(e) => handleChangeState(e.target.value, 'street')}
                    placeholder="Tên đường, số nhà"
                    prefix={<HomeOutlined className="text-[#1890ff]" />}
                />

                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={state.isDefault}
                        onChange={(e) => handleChangeState(e.target.checked, 'isDefault')}
                    />
                    
                    <label className="text-sm">Đặt làm địa chỉ mặt định</label>
                </div>

            </Modal>
        </div>
    )
}

export default ModalAddAddress