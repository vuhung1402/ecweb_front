import React, { useEffect, useRef, useState } from "react"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { endpoint } from "../../api/api"
import { Button, Input, message, Select } from "antd"
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error"
import { getDistricts, getProvinces, getWards, logAgain } from "@utils/function"
import { useNavigate } from "react-router-dom"
import { SUCCESS } from "@utils/message"
import { HomeOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons"


const InsertAddress = (props) => {
    const { provinces, provinceName, provinceID, wards, wardCode, wardName, districts, districtID, districtName, name, number, street, isDefault } = props
    const { setAddAddress, getDataAddress, onSelectProvince, onSelectDistrict, onSelectWard, onChangeInfor } = props

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    // const [isDefault, setIsDefault] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const nameRef = useRef()
    const streetRef = useRef()
    const phoneRef = useRef()

    const addAddress = async () => {
        // setIsLoading(true);
        const body = {
            name,
            street,
            provinceID,
            provinceName,
            districtID,
            districtName,
            wardCode,
            wardName,
            number,
            isDefault: isDefault
        }

        console.log({ body })

        // await fetch(`${endpoint}/users/insert_address/`, {
        //     method: "POST",
        //     body: JSON.stringify(body),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'token': token,
        //     },
        // }).then((response) => {
        //     if (!response.ok) {
        //         throw new Error("Netword response not ok")
        //     }
        //     return response.json()
        // }).then((json) => {
        //     if (json?.success) {
        //         getDataAddress();
        //         setIsLoading(false);
        //         message.success(SUCCESS)
        //     } else {
        //         if (json?.message === TOKEN_INVALID || json?.message === NOT_AUTHENTICATION) {
        //             logAgain();
        //             navigate("/login");
        //         } else {
        //             setIsLoading(false);
        //             message.error(FAIL);
        //         }
        //     }

        // }).catch((error) => {
        //     console.error("Error: ", error)
        // })
    }

    const handleChange = (e) => {
        setIsDefault(e.target.checked)
    }

    return (
        <>
            <Input
                value={name}
                type=""
                className="text-sm outline-none border"
                onChange={(e) => onChangeInfor(e.target.value, 'name')}
                placeholder="Họ và tên"
                prefix={<UserOutlined className="opacity-60"/>}
                classNames={{
                    input: '!px-2'
                }}
            />

            <Input
                value={number}
                type=""
                className="text-sm outline-none border"
                onChange={(e) => onChangeInfor(e.target.value, 'number')}
                placeholder="Số điện thoại"
                prefix={<PhoneOutlined className="opacity-60"/>}
                classNames={{
                    input: '!px-2'
                }}
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
                suffixIcon={<HomeOutlined />}
            />

            <Select
                showSearch
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
                prefix={<HomeOutlined className="opacity-60"/>}
                className="text-sm outline-none border"
                classNames={{
                    input: '!px-2'
                }}
                onChange={(e) => onChangeInfor(e.target.value, 'street')}
                placeholder="tên đường, số nhà"
            />

            <div class="flex items-center mb-2">
                <input value={isDefault} onChange={(e) => onChangeInfor(e.target.checked, 'isDefault')} id="default-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 outline-none cursor-pointer" />
                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Đặt làm địa chỉ mặc định</label>
            </div>

            <div className=" flex items-center">
                <Button
                    loading={isLoading}
                    onClick={addAddress} type="primary"
                    className="font-bold"
                >
                    Thêm mới
                </Button>
                <div className="ml-2 flex gap-2 text-sm">
                    <div className="">hoặc</div>
                    <p
                        onClick={() => setAddAddress(false)} className="hover:text-blue-500 cursor-pointer font-bold opacity-60"
                    >
                        Huỷ
                    </p>
                </div>
            </div>
        </>
    )
}

export default InsertAddress