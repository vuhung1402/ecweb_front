import { useEffect, useState } from "react"
import AddressInfor from "./AddressInfor"
import { useUserPackageHook } from "../redux/hooks/userHook"
import UpdateAddress from "./UpdateAddress"
import DeletePopUp from "./DeletePopUp"
import SuccessAlert from "./SuccesAlert"
import UnsuccessAlert from "./UnsuccessAlert"
import Loading from "./Loading"
import { endpoint } from "../api"

const Address = () => {

    const data = useUserPackageHook()

    const [addressPopUp, setAddressPopUp] = useState(false)
    const [updateAddress, setUpdateAddress] = useState(false)
    const [deleteAddress, setDeleteAddress] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [unsuccessAlert, setUnsuccessAlert] = useState(false)
    const [addresses, setAddresses] = useState()

    useEffect(() => {
        fetch(`${endpoint}/users/me/addresses`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${data?.accessToken}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if(!response.ok){
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            if(json?.success){
                setAddresses(json?.data?.addresses)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    },[updateAddress,deleteAddress, addressPopUp])

    return(
        <div className=" p-2 h-screen overflow-y-scroll scrollbar-hide">
            {addressPopUp && <AddressInfor setAddressPopUp= {setAddressPopUp} />}
            { successAlert && <SuccessAlert/>}
            { unsuccessAlert && <UnsuccessAlert/>}
            <button onClick={() => setAddressPopUp(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Add address
            </button>
            { !addresses && <Loading/>}
            {
                addresses?.map((address) => {
                    return(
                        <div className=" border-t-2">
                            { updateAddress && <UpdateAddress address = {address} setSuccessAlert = {setSuccessAlert} setUnsuccessAlert = {setUnsuccessAlert} setUpdateAddress = {setUpdateAddress} /> }
                            { deleteAddress && <DeletePopUp addressId = {address?._id} setDeleteAddress = {setDeleteAddress} />}
                            <div className="flex items-center justify-between p-8 border-b-2">
                                <div>
                                    <div className="p-1">{address?.name}</div>
                                    <div className="p-1">{address?.phone}</div>
                                    <div className="p-1">{address?.ward}, {address?.district}, {address?.city}</div>
                                    <div className="p-1">{address?.detail}</div>
                                </div>
                                <div>
                                    <button onClick={() => setUpdateAddress(true)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                        Update
                                    </button>
                                    <button onClick={() => setDeleteAddress(true)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default Address