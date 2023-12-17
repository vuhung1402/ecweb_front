import { useEffect, useRef, useState } from "react"
import { endpoint } from "../../api"
import HeaderSeller from "../../component/HeaderSeller"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import UpdateAddress from "../../component/UpdateAddress"
import SuccessAlert from "../../component/SuccesAlert"
import UnsuccessAlert from "../../component/UnsuccessAlert"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { clear } from "../../redux/actions"

const RegisterSeller = () => {
    const [addresses, setAddresses] = useState()
    const [updateAddress, setUpdateAddress] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [unsuccessAlert, setUnsuccessAlert] = useState(false)
    const user = useUserPackageHook()
    // const [shopName, setShopName] = useState()
    // const [shopDescription, setShopDescription] = useState()

    const shopNameRef = useRef(null)
    const shopDescriptionRef = useRef(null)

    const navigate = useNavigate()

    const data = useUserPackageHook()
    const dispatch = useDispatch()

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
                console.log(json)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    },[])

    const handleUpdate = () => {
        setUpdateAddress(!updateAddress)
    }

    const handleRegister = () => {
        const body = {
            name: shopNameRef.current.value,
            description: shopDescriptionRef.current.value,
            address: addresses[0]
        }
        console.log("body for register seller: ", body)
        fetch(`${endpoint}/shops/me`, {
            method:"POST",
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
                    setSuccessAlert(true)
                    dispatch(clear())
                    navigate("/")
                    setTimeout(() => {
                        setSuccessAlert(false)
                    },3000)
                }
            }).catch((e) => {
                setUnsuccessAlert(true)
                setTimeout(() => {
                    setUnsuccessAlert(false)
                },3000)
                console.log("e", e)
            })
    }

    return(
        <div>
            <HeaderSeller/>
            {updateAddress && <UpdateAddress address = {addresses[0]} setSuccessAlert = {setSuccessAlert} setUnsuccessAlert = {setUnsuccessAlert} setUpdateAddress = {setUpdateAddress} />}
            { successAlert && <SuccessAlert/>}
            { unsuccessAlert && <UnsuccessAlert/>}
            <div class="max-w-sm mx-auto mt-2">
                <div>
                    <div className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Infor shop</div>
                    <div class="mb-2">
                        <input ref={shopNameRef} type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tên cửa hàng" required/>
                    </div>
                    <div class="mb-2">
                        <input ref={shopDescriptionRef} type="text" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tổng quan về cửa hàng" required/>
                    </div>
                </div>
                
                <div className="mt-5">
                    <div className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">Shop Address</div>
                    
                    { addresses &&

                        (
                            <div className=" border-t-2">
                                <div className="flex items-center justify-between border-b-2">
                                    <div>
                                        <div className="p-1">{addresses[0]?.name}</div>
                                        <div className="p-1">{addresses[0]?.phone}</div>
                                        <div className="p-1">{addresses[0]?.ward}, {addresses[0]?.district}, {addresses[0]?.city}</div>
                                        <div className="p-1">{addresses[0]?.detail}</div>
                                    </div>
                                    <div className=" text-center">
                                        <button onClick={handleUpdate} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                            Cập nhật
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    
                    }
                </div>
                
                <div className="">
                    <button onClick={handleRegister} type="submit" className="text-white mt-4 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng ký</button>
                </div>
            </div>

            
        </div>
    )
}

export default RegisterSeller