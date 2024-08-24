import React from "react";
import { useEffect, useState } from "react"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { endpoint } from "../../api/api"
import UpdateAddress from "../UpdateAddress/UpdateAddress";
import { message, Popconfirm } from "antd";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { logAgain } from "@utils/function";
import { useNavigate } from "react-router-dom";
import { FAIL, SUCCESS } from "@utils/message";

const AddressInfor = (props) => {
    const { address, addressId, name, number, street, isDefault, provinceID, provinceName, districtID } = props;
    const { districtName, wardCode, wardName, provinces, districts, wards, isUpdateLoading } = props;
    const { getDataAddress, copyAddress, onChangeInfor, onSelectProvince, onSelectDistrict, onSelectWard, handleUpdateAddress } = props;

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [state, setState] = useState({
        isLoading: false,
        isDeleteLoading: false,
        inforAdress: {
            name: "",
            street: "",
            number: "",
            provinceName: '',
            provinceID: '',
            districtName: '',
            districtID: '',
            wardName: '',
            wardCode: '',
            isDefault: false
        }
    })

    // useEffect(() => {
    //     if (address) {
    //         state.inforAdress.name = address?.name;
    //         state.inforAdress.street = address?.street;
    //         state.inforAdress.number = address?.number;
    //         state.inforAdress.isDefault = address?.isDefault;
    //     }
    // }, [address])

    const handleUpdateInfor = (e, key) => {
        state.inforAdress[key] = key === "isDefault" ? e.target.checked : e.target.value;
        setState(prev => ({ ...prev }));
    }

    const handleSaveAddress = async () => {
        setState((prev) => ({ ...prev, isLoading: true }));

        const body = {
            name,
            number,
            street,
            isDefault,
            provinceID,
            provinceName,
            districtID,
            districtName,
            wardCode,
            wardName
        }

        console.log({body});

        // await fetch(`${endpoint}/users/update_address/${address?._id}/`, {
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
        //         setState((prev) => ({ ...prev, isLoading: false }));
        //         getDataAddress();
        //         message.success(SUCCESS);
        //     } else {
        //         if (json?.message === TOKEN_INVALID || json?.message === NOT_AUTHENTICATION) {
        //             logAgain();
        //             navigate("/login");
        //         } else {
        //             setState((prev) => ({ ...prev, isLoading: false }));
        //             message.error(FAIL);
        //         }
        //     }

        // }).catch((error) => {
        //     console.error("Error: ", error)
        // })
    }

    const handleUpdate = () => {
        copyAddress(address);
    }


    const handleDelete = async () => {
        setState((prev) => ({ ...prev, isDeleteLoading: true }));
        await fetch(`${endpoint}/users/delete_address/${address?._id}/`, {
            method: "POST",
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
            if (json?.success) {
                getDataAddress()
                setState((prev) => ({ ...prev, isDeleteLoading: false }));
                message.success(SUCCESS)
            } else {
                if (json?.message === TOKEN_INVALID || json?.message === NOT_AUTHENTICATION) {
                    logAgain();
                    navigate("/login");
                } else {
                    setState((prev) => ({ ...prev, isDeleteLoading: false }));
                    message.error(FAIL);
                }
            }

        }).catch((error) => {
            console.error("Error: ", error)
        })
    }

    // onClick={() => setUpdateAddress(!updateAddress)}
    return (
        <div className="w-full pb-2">
            <div className="bg-[#d9edf7] flex p-3 items-center justify-between">
                <div className="flex items-center gap-1 text-sm font-bold opacity-60">
                    <p>{address?.name}</p>
                    <span>{address?.isDefault ? "(Địa chỉ mặc định)" : ""}</span>
                </div>
                <div className=" flex gap-2">

                    {/* update */}
                    <div onClick={handleUpdate} className="cursor-pointer flex items-center justify-center hover:text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </div>

                    {/* // delete */}
                    <Popconfirm
                        title="Xoá địa chỉ"
                        description="Bạn muốn xoá địa chỉ này?"
                        cancelText="Huỷ"
                        okText="Xác nhận"
                        onConfirm={handleDelete}
                        okButtonProps={{
                            loading: state.isDeleteLoading,
                        }}
                    >
                        <div className="cursor-pointer hover:text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </Popconfirm>


                </div>
            </div>

            {/* {updateAddress ? <UpdateAddress/> : <AddressInfor/>} */}
            {
                addressId === address?._id ?

                    <UpdateAddress
                        address={address}
                        isUpdateLoading={isUpdateLoading}
                        name={name}
                        provinces={provinces}
                        districts={districts}
                        wards={wards}
                        street={street}
                        number={number}
                        provinceName={provinceName}
                        provinceID={provinceID}
                        districtName={districtName}
                        districtID={districtID}
                        wardName={wardName}
                        wardCode={wardCode}
                        isDefault={isDefault}
                        isLoading={state.isLoading}
                        inforAdress={state.inforAdress}
                        handleUpdateInfor={handleUpdateInfor}
                        handleSaveAddress={handleSaveAddress}
                        handleUpdateAddress={handleUpdateAddress}
                        onChangeInfor={onChangeInfor}
                        onSelectProvince={onSelectProvince}
                        onSelectDistrict={onSelectDistrict}
                        onSelectWard={onSelectWard}
                    /> :

                    (
                        <div className="p-3 flex flex-col gap-3 bg-[#fafafa] text-sm font-bold opacity-60">
                            <div>{address?.name}</div>
                            <div className=" flex items-start">
                                <p className=" w-[40%]">Địa chỉ:</p>
                                <p className=" w-[60%] flex  flex-grow justify-start ">{address?.street}, {address?.wardName}, {address?.districtName}, {address?.provinceName}</p>
                            </div>
                            <div className=" flex items-start">
                                <p className=" w-[40%]">Số điện thoại:</p>
                                <p className=" w-[60%] flex justify-start flex-grow">{address?.number}</p>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default AddressInfor