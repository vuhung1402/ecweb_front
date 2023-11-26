import { useState } from "react"
import { useUserPackageHook } from "../redux/hooks/userHook"
import { endpoint } from "../api"

const AddressInfor = ({setAddressPopUp}) => {
    const user = useUserPackageHook()
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [city, setCity] = useState()
    const [district, setDistrict] = useState()
    const [ward, setWard] = useState()
    const [detail, setDetail] = useState()

    const handleAddAddress = () => {
        const body = {
            name: name,
            phone: phone,
            city: city,
            district: district,
            ward: ward,
            detail: detail
        }

        fetch(`${endpoint}/users/me/addresses`, {
            method: "POST",
            body: JSON.stringify(body),
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
                console.log("json: ", json)
                setAddressPopUp(false)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }

    return(
        <div className="bg-[rgba(184,184,184,0.35)] bg-opacity-90 fixed w-screen h-screen top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="h-[500px] w-[400px] px-2 bg-white">
                <div onClick={() => setAddressPopUp(false)} className="flex flex-row-reverse cursor-pointer mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className=" text-2xl font-bold w-full">
                    Địa chỉ
                </div>
                <div class="my-3">
                    <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Họ và tên" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div class="my-3">
                    <input onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Số điện thoại" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div class="my-3">
                    <input onChange={(e) => setCity(e.target.value)} type="text" placeholder="Thành Phố" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div class="my-3">
                    <input onChange={(e) => setDistrict(e.target.value)} type="text" placeholder="Quận/Huyện" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div class="my-3">
                    <input onChange={(e) => setWard(e.target.value)} type="text" placeholder="Phường/Xã" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div class="my-3">
                    <input onChange={(e) => setDetail(e.target.value)} type="text" placeholder="Địa chỉ cụ thể" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <button onClick={handleAddAddress} className="text-white float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Add address
                </button>
            </div>
        </div>
    )
}

export default AddressInfor