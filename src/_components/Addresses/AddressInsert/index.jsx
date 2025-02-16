import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Input, message, Select } from "antd";
import { HomeOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";

import { FAIL } from "@utils/message";
import { useInsertAddress } from "@api/Addresses";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { getDistricts, getProvinces, getWards, logAgain } from "@utils/function";

const AddressInsert = ({ refetch, setAddAddress }) => {

    const navigate = useNavigate()

    const [state, setState] = useState({
        addressInfo: {
            name: '',
            street: '',
            number: '',
            provinceID: '',
            provinceName: '',
            districtID: '',
            districtName: '',
            wardCode: '',
            wardName: '',
            isDefault: false,
        },
        provinces: [],
        districts: [],
        wards: [],
    })

    const { mutate: insertAddressMutation, isPending: isInsertPending } = useInsertAddress()

    // get province data
    const getProvinceData = async () => {
        const response = await getProvinces();
        if (response?.code === 200) {
            setState((prev) => ({ ...prev, provinces: response?.data }))
        }
    }

    useEffect(() => {
        getProvinceData()
    },[])

    const handleChangeInfo = (value, key) => {
        setState(prev => ({...prev, addressInfo: { ...prev.addressInfo, [key]: value }}))
    }

    // handle when select province
    const handleSelectProvince = async (value, option) => {
        const response = await getDistricts(value);
        if (response?.code === 200) {
            setState((prev) => ({
                ...prev,
                districts: response?.data,
                addressInfo: {
                    ...prev.addressInfo,
                    provinceID: value,
                    provinceName: option?.label,
                    districtID: '',
                    districtName: '',
                    wardCode: '',
                    wardName: '',
                }
            }))
        }
    }

    // handle when select district
    const handleSelectDistrict = async (value, option) => {
        const response = await getWards(value);
        if (response?.code === 200) {
            setState((prev) => ({
                ...prev,
                wards: response?.data,
                addressInfo: {
                    ...prev.addressInfo,
                    districtID: value,
                    districtName: option?.label,
                }
            }));
        }
    }

    // handle when select ward
    const handleSelectWard = async (value, option) => {
        setState((prev) => ({
            ...prev,
            addressInfo: {
                ...prev.addressInfo,
                wardCode: value,
                wardName: option?.label,
            }
        }))
    }

    const handleInsertAddress = () => {
        const body = state.addressInfo
        const isValidBody = Object.values(body).every(value => value !== null && value !== undefined && value !== '' )
        if (!isValidBody) {
            message.warning('Vui lòng điền đầy đủ thông tin!')
            return
        }

        insertAddressMutation(body, {
            onSuccess: () => {
                refetch()
                setAddAddress(prev => !prev)
            },
            onError: (error) => {
                const response = error?.response?.data
                if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate('/login')
                } else {
                    message.error(FAIL);
                };
            }
        })
    }

    return (
        <>
            <Input
                type=""
                placeholder="Họ và tên"
                value={state.addressInfo.name}
                classNames={{ input: '!px-2' }}
                className="text-sm outline-none border"
                prefix={<UserOutlined className="opacity-60" />}
                onChange={(e) => handleChangeInfo(e.target.value, 'name')}
            />

            <Input
                type=""
                placeholder="Số điện thoại"
                classNames={{ input: '!px-2' }}
                value={state.addressInfo.number}
                className="text-sm outline-none border"
                prefix={<PhoneOutlined className="opacity-60" />}
                onChange={(e) => handleChangeInfo(e.target.value, 'number')}
            />

            <Select
                showSearch
                optionFilterProp="label"
                placeholder="Tỉnh, Thành Phố"
                suffixIcon={<HomeOutlined />}
                onSelect={handleSelectProvince}
                value={state.addressInfo.provinceID}
                options={state.provinces?.map((item) => ({
                    label: item?.ProvinceName,
                    value: item?.ProvinceID,
                }))}
            />

            <Select
                showSearch
                optionFilterProp="label"
                placeholder="Quận, Huyện"
                suffixIcon={<HomeOutlined />}
                onSelect={handleSelectDistrict}
                value={state.addressInfo.districtID}
                options={state.districts?.map((item) => ({
                    label: item?.DistrictName,
                    value: item?.DistrictID,
                }))}
            />

            <Select
                showSearch
                optionFilterProp="label"
                placeholder="Phường, Xã"
                suffixIcon={<HomeOutlined />}
                onSelect={handleSelectWard}
                value={state.addressInfo.wardCode}
                options={state.wards?.map((item) => ({
                    label: item?.WardName,
                    value: item?.WardCode,
                }))}
            />

            <Input
                type=""
                placeholder="Tên đường, số nhà"
                classNames={{ input: '!px-2' }}
                value={state.addressInfo.street}
                className="text-sm outline-none border"
                prefix={<HomeOutlined className="opacity-60"/>}
                onChange={(e) => handleChangeInfo(e.target.value, 'street')}
            />

            <div className="flex items-center gap-2">
                <Checkbox
                    checked={state.addressInfo.isDefault}
                    onChange={(e) => handleChangeInfo(e.target.checked, 'isDefault')}
                />
                
                <label className="text-sm">Đặt làm địa chỉ mặt định</label>
            </div>

            <div className="flex items-center">
                <Button
                    type="primary"
                    className="font-bold"
                    loading={isInsertPending}
                    onClick={handleInsertAddress}
                >
                    Thêm mới
                </Button>
                <div className="ml-2 flex gap-2 text-sm">
                    <div>hoặc</div>
                    <p
                        onClick={() => setAddAddress(false)}
                        className="hover:text-blue-500 cursor-pointer font-bold opacity-60"
                    >
                        Huỷ
                    </p>
                </div>
            </div>
        </>
    )
}

export default AddressInsert