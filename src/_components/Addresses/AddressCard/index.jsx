import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import AddressBasicInfo from "../AddressBasicInfo";
import AddressCardHeader from "../AddressCardHeader";
import AddressUpdateCard from "../AddressUpdateCard";

import { FAIL, SUCCESS } from "@utils/message";
import { useDeleteAdress } from "@api/Addresses";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { getDistricts, getProvinces, getWards, logAgain } from "@utils/function";

const AddressCardWrapper = (props) => {
    return (
        <div className="w-full pb-2" {...props} />
    )
}

const AddressCard = (props) => {

    const { address, addressId, updateAddressPending } = props
    const { onToggleUpdateAddress, handleUpdateAddress, refetch } = props

    const navigate = useNavigate()

    const { mutate: deleteAddressMutation, isPending: isDeleteAddressPending } = useDeleteAdress()

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

    // get province data
    const getProvinceData = async () => {
        const response = await getProvinces();
        if (response?.code === 200) {
            setState((prev) => ({ ...prev, provinces: response?.data }))
        }
    }

    // get province and set address to state
    useEffect(() => {
        if (address) {
            getProvinceData()
            setState(prev => ({ ...prev, addressInfo: {...address}}))
        }
    },[address])

    // handle change input value
    const handleChangeInfo = (value, type) => {
        setState(prev => ({
            ...prev,
            addressInfo: {
                ...prev.addressInfo,
                [type]: value,
            }
        }))
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

    // handle when update address
    const onUpdateAddress = () => {
        const body = state.addressInfo
        const isValidBody = Object.values(body).every(value => value !== null && value !== undefined && value !== '' )
        if (!isValidBody) {
            message.warning('Vui lòng điền đầy đủ thông tin!')
            return
        }

        handleUpdateAddress(body)
    }

    // handle when delete address
    const handleDeleteAddress = () => {
        deleteAddressMutation(address?._id, {
            onSuccess: () => {
                message.success(SUCCESS);
                refetch();
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
        <AddressCardWrapper>
            <AddressCardHeader
                address={address}
                onToggleUpdateAddress={onToggleUpdateAddress}
                isDeleteAddressPending={isDeleteAddressPending}
                handleDeleteAddress={handleDeleteAddress}
            />

            {addressId === address?._id ? (
                <AddressUpdateCard
                    wards={state.wards}
                    provinces={state.provinces}
                    districts={state.districts}
                    addressInfo={state.addressInfo}
                    updateAddressPending={updateAddressPending}
                    onChangeInfo={handleChangeInfo}
                    onSelectWard={handleSelectWard}
                    onUpdateAddress={onUpdateAddress}
                    onSelectProvince={handleSelectProvince}
                    onSelectDistrict={handleSelectDistrict}
                    onToggleUpdateAddress={onToggleUpdateAddress}
                />
            ) : (
                <AddressBasicInfo address={address} />
            )}
        </AddressCardWrapper>
    )
}

export default AddressCard