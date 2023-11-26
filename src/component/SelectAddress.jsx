import { useEffect, useState } from "react"
import { useUserPackageHook } from "../redux/hooks/userHook"
import { endpoint } from "../api"

const SelectAddress = ({addressShipping, setAddressShipping, setSelectAddress}) => {

    const user = useUserPackageHook()

    const [addresses, setAddresses] = useState()


    useEffect(() => {
        fetch(`${endpoint}/users/me/addresses`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${user?.accessToken}`,
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
                console.log(json?.data?.addresses)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    },[])

    const handleChangeAddress = (address,e) => {
        if(e.target.checked){
            setAddressShipping(address)
        }
    }

    return(
        <div className="bg-[rgba(184,184,184,0.35)] bg-opacity-90 fixed w-screen h-screen top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="h-[500px] w-[400px] px-2 bg-white" >
                <div className="flex justify-between py-2 border-b-2">
                    <div>Địa chỉ nhận hàng</div>
                    <div onClick={() => setSelectAddress(false)} className=" cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                {
                    addresses?.map((address) => {
                        return(
                            <div className="flex items-center justify-between p-8 border-b-2">
                                <input type="checkbox" className="mr-4" checked = {address?._id === addressShipping?._id} onChange={(e) => handleChangeAddress(address,e)}/>
                                <div>
                                    <div className="p-1">{address?.ward}, {address?.district}, {address?.city}</div>
                                    <div className="p-1">{address?.detail}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SelectAddress