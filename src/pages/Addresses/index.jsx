import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { message } from "antd"

import SideBar from "@pages/Profile/SideBar"
import InsertAddress from "../../component/InsertAddress/InsertAddress"
import AddressCard from "@_components/Addresses/AddressCard"
import { AddAddressWrapper, AddressesContainer, AddressesInfoWrapper, AddressesTitle, AddressesWrapper, AddressListWrapper } from "./Addresses"

import { logAgain } from "@utils/function"
import { useUpdateAddress } from "./function"
import { FAIL, SUCCESS } from "@utils/message"
import { useGetAddressInfo } from "@pages/Checkout/function"
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error"

const Address = () => {
    const navigate = useNavigate()

    const [addAddress, setAddAddress] = useState(false);

    const { data: addressInfo, refetch, isLoading: isAddressLoading } = useGetAddressInfo()
    const { mutate: updateAddressMutation, isPending: updateAddressPending } = useUpdateAddress()

    const [state, setState] = useState({
        addressId: '',
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

    const handleToggleUpdateAddress = (addressId) => {
        setState(prev => ({
            ...prev,
            addressId: state.addressId === addressId ? '' : addressId
        }))
    }

    const handleUpdateAddress = async (body) => {

        const { addressId } = state

        updateAddressMutation({ body, addressId }, {
            onSuccess: (res) => {
                message.success(SUCCESS)
                handleToggleUpdateAddress('')
                refetch()
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
        <AddressesContainer isLoading={isAddressLoading}>

            <AddressesTitle />
            
            <AddressesWrapper>

                <div className="w-full md:w-1/4 px-5">
                    <SideBar />
                </div>

                <AddressesInfoWrapper>
                    <AddressListWrapper address={addressInfo}>
                        {addressInfo?.map((item) => {
                            return (
                                <AddressCard
                                    address={item}
                                    addressId={state.addressId}
                                    updateAddressPending={updateAddressPending}
                                    refetch={refetch}
                                    handleUpdateAddress={handleUpdateAddress}
                                    onToggleUpdateAddress={handleToggleUpdateAddress}
                                />
                            )
                        })}
                    </AddressListWrapper>

                    <AddAddressWrapper handleAddAddressClick={handleAddAddressClick}>
                            {addAddress &&
                                (
                                    <div className="flex flex-col gap-3" ref={insertAddressRef}>
                                        <InsertAddress
                                            // setAddAddress={setAddAddress}
                                            // getDataAddress={getDataAddress}
                                            // name={state.name}
                                            // number={state.number}
                                            // street={state.street}
                                            // isDefault={state.isDefault}
                                            // provinces={state.provinces}
                                            // provinceID={state.provinceID}
                                            // provinceName={state.provinceName}
                                            // wards={state.wards}
                                            // wardCode={state.wardCode}
                                            // wardName={state.wardName}
                                            // districts={state.districts}
                                            // districtID={state.districtID}
                                            // districtName={state.districtName}
                                            // onSelectProvince={onSelectProvince}
                                            // onSelectDistrict={onSelectDistrict}
                                            // onSelectWard={onSelectWard}
                                            // onChangeInfor={onChangeInfor}
                                        />
                                    </div>
                                )
                            }
                    </AddAddressWrapper>
                </AddressesInfoWrapper>
            </AddressesWrapper>
        </AddressesContainer>
    )
}

export default Address