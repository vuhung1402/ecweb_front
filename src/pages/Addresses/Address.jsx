import React, { useRef } from "react"
import { useEffect, useState } from "react"
import AddressInfor from "../../component/AddressInfor/AddressInfor"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { endpoint } from "../../api/api"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { clear } from "../../redux/actions"
import InsertAddress from "../../component/InsertAddress/InsertAddress"
import Loading from "../../component/Loading/Loading"
import { getDistricts, getProvinces, getWards, logAgain } from "@utils/function"
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error"
import { Button, message } from "antd"
import SideBar from "@pages/Profile/SideBar"
import { updateAddress } from "./function"
import { FAIL, SUCCESS } from "@utils/message"

const Address = () => {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch()
    const data = useUserPackageHook()
    const navigate = useNavigate()
    const user = useUserPackageHook();

    const [address, setAddress] = useState(undefined)
    const [addAddress, setAddAddress] = useState(false);

    const [state, setState] = useState({
        addressId: '',
        provinceID: undefined,
        provinceName: undefined,
        districtID: undefined,
        districtName: undefined,
        wardCode: undefined,
        wardName: undefined,
        provinces: undefined,
        districts: undefined,
        wards: undefined,
        name: undefined,
        street: undefined,
        number: undefined,
        isDefault: false,
        isUpdateLoading: false,
    })

    const insertAddressRef = useRef(null);

    const handleAddAddressClick = () => {
        setAddAddress(!addAddress);
        if (!addAddress) {
            setTimeout(() => {
                insertAddressRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }

    useEffect(() => {
        getDataAddress();
        getProvinceData();
    }, [])

    const getDataAddress = async () => {
        await fetch(`${endpoint}/users/get_address/`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            if (json?.message === TOKEN_INVALID || json?.message === NOT_AUTHENTICATION) {
                logAgain();
                navigate("/login");
            } else {
                setAddress(json)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }

    const getProvinceData = async () => {
        const response = await getProvinces();
        if (response?.code === 200) {
            setState((prev) => ({ ...prev, provinces: response?.data }))
        }
    }

    const onSelectProvince = async (value, option) => {
        setState((prev) => ({ ...prev, provinceID: value, provinceName: option?.label }));
        const response = await getDistricts(value);
        if (response?.code === 200) {
            setState((prev) => ({ ...prev, districts: response?.data }))
        }
    }

    const onSelectDistrict = async (value, option) => {
        setState((prev) => ({ ...prev, districtID: value, districtName: option?.label }));
        const response = await getWards(value);
        if (response?.code === 200) {
            setState((prev) => ({ ...prev, wards: response?.data }));
        }
    }

    const onSelectWard = async (value, option) => {
        setState((prev) => ({ ...prev, wardCode: value, wardName: option?.label }))
    }

    const onChangeInfor = (value, type) => {
        setState((prev) => ({
            ...prev,
            [type]: value,
        }))
    }

    const copyAddress = async (address) => {
        const isDisplayEdit = state.addressId === address?._id;

        const resDistricts = await getDistricts(Number(address?.provinceID));
        const resWards = await getWards(Number(address?.districtID));
        
        setState((prev) => ({
            ...prev,
            addressId: isDisplayEdit ? '' : address?._id,
            name: isDisplayEdit ? '' : address?.name,
            street: isDisplayEdit ? '' : address?.street,
            number: isDisplayEdit ? '' : address?.number,
            isDefault: isDisplayEdit ? '' : address?.isDefault,
            provinceID: isDisplayEdit ? '' : address?.provinceID,
            provinceName: isDisplayEdit ? '' : address?.provinceName,
            districtID: isDisplayEdit ? '' : address?.districtID,
            districtName: isDisplayEdit ? '' : address?.districtName,
            wardCode: isDisplayEdit ? '' : address?.wardCode,
            wardName: isDisplayEdit ? '' : address?.wardName,
            wards: resWards?.data,
            districts: resDistricts?.data,
        }));
    };

    const handleUpdateAddress = async () => {
        setState((prev) => ({...prev, isUpdateLoading:true}))
        const body = {
            name: state.name,
            street: state.street,
            provinceID: state.provinceID,
            provinceName: state.provinceName,
            districtID: state.districtID,
            districtName: state.districtName,
            wardCode: state.wardCode,
            wardName: state.wardName,
            number: state.number,
            isDefault: state.isDefault,
        }

        console.log({body});

        const res = await updateAddress(body, state.addressId);
        // {
        //     "success": true,
        //     "message": "Địa chỉ đã cập nhật thành công",
        //     "color": "text-green-500"
        // }
        if(res?.success){
            message.success(SUCCESS);
            getDataAddress();
            setState((prev) => ({ ...prev, isUpdateLoading: false }))
        }else{
            if(res?.message === TOKEN_INVALID || res?.message === NOT_AUTHENTICATION){
                logAgain();
                navigate('/')
            }else{
                message.error(FAIL)
            }
            setState((prev) => ({ ...prev, isUpdateLoading: false }))
        }
        console.log(res);
    }

    return (
        <div className="w-full h-full bg-gray-50 overflow-y-auto">
            {
                address === undefined ? <Loading /> :
                    (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                <h1 className="text-3xl font-bold text-center mb-8">Thông tin địa chỉ</h1>
                            </div>
                            <div className="flex flex-col md:flex-row gap-8 w-full md:w-[750px] me:w-[970px] xl:w-[1170px] mx-auto">
                                <div className="w-full md:w-1/4 px-5">
                                    <SideBar />
                                </div>

                                <div className="w-full me:w-3/4 px-5 flex flex-col me:flex-row gap-3">

                                    <div className="w-full me:w-7/12">
                                        {/* {updateAddress ? <UpdateAddress/> : <AddressInfor/>} */}
                                        {address?.map((item) => {
                                            return (
                                                <AddressInfor
                                                    addressId={state.addressId}
                                                    provinces={state.provinces}
                                                    districts={state.districts}
                                                    wards={state.wards}
                                                    address={item}
                                                    name={state.name}
                                                    street={state.street}
                                                    number={state.number}
                                                    isDefault={state.isDefault}
                                                    provinceID={state.provinceID}
                                                    provinceName={state.provinceName}
                                                    districtID={state.districtID}
                                                    districtName={state.districtName}
                                                    wardCode={state.wardCode}
                                                    wardName={state.wardName}
                                                    isUpdateLoading={state.isUpdateLoading}
                                                    getDataAddress={getDataAddress}
                                                    copyAddress={copyAddress}
                                                    onChangeInfor={onChangeInfor}
                                                    onSelectProvince={onSelectProvince}
                                                    onSelectDistrict={onSelectDistrict}
                                                    onSelectWard={onSelectWard}
                                                    handleUpdateAddress={handleUpdateAddress}
                                                />
                                            )
                                        })}

                                    </div>

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
                                            {
                                                addAddress &&
                                                (
                                                    <div className="flex flex-col gap-3" ref={insertAddressRef}>
                                                        <InsertAddress
                                                            setAddAddress={setAddAddress}
                                                            getDataAddress={getDataAddress}
                                                            name={state.name}
                                                            number={state.number}
                                                            street={state.street}
                                                            isDefault={state.isDefault}
                                                            provinces={state.provinces}
                                                            provinceID={state.provinceID}
                                                            provinceName={state.provinceName}
                                                            wards={state.wards}
                                                            wardCode={state.wardCode}
                                                            wardName={state.wardName}
                                                            districts={state.districts}
                                                            districtID={state.districtID}
                                                            districtName={state.districtName}
                                                            onSelectProvince={onSelectProvince}
                                                            onSelectDistrict={onSelectDistrict}
                                                            onSelectWard={onSelectWard}
                                                            onChangeInfor={onChangeInfor}
                                                        />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default Address