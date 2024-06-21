import React from "react"
import { useEffect, useState } from "react"
import AddressInfor from "../AddressInfor/AddressInfor"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { endpoint } from "../../api/api"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { clear } from "../../redux/actions"
import InsertAddress from "../InsertAddress/InsertAddress"
import Loading from "../Loading/Loading"
import SildeBar from "@pages/profile/SildeBar"
import { logAgain } from "@utils/function"
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error"

const Address = () => {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch()
    const data = useUserPackageHook()
    const navigate = useNavigate()
    const user = useUserPackageHook();

    const [address, setAddress] = useState(undefined)

    // console.log(data?.accessToken)

    useEffect(() => {
        getDataAddress();
    }, [])

    const getDataAddress = () => {
        fetch(`${endpoint}/users/get_address/`, {
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
            if(json?.message === TOKEN_INVALID || json?.message === NOT_AUTHENTICATION){
                logAgain();
                navigate("/login");
            }else{
                setAddress(json)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }

    const [updateAddress, setUpdateAddress] = useState(false)
    const [addAddress, setAddAddress] = useState(false)

    const handleLogOut = () => {
        dispatch(clear())
        navigate('/')
    }


    return (
        <div>
            {
                address === undefined ? <Loading /> :
                    (
                        <>
                            <div className=" flex flex-col items-center justify-center font-semibold text-5xl gap-8 p-5 border-b-[1px]">
                                <h1>Thông tin địa chỉ</h1>
                                <span className="bg-black p-[1.5px] w-14 flex items-center justify-center"></span>
                            </div>
                            <div className=" flex">
                                <SildeBar/>

                                <div className="w-3/4 p-5 flex">

                                    <div className=" w-1/2">
                                        {/* {updateAddress ? <UpdateAddress/> : <AddressInfor/>} */}
                                        {address?.map((item) => { return <AddressInfor address={item} getDataAddress = {getDataAddress} /> })}

                                    </div>

                                    <div className=" w-1/2 px-3">
                                        <div className="px-3 flex flex-col gap-3">
                                            <button type="button" onClick={() => setAddAddress(!addAddress)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Nhập địa chỉ mới</button>
                                            {
                                                addAddress &&
                                                (
                                                    <InsertAddress setAddAddress={setAddAddress} getDataAddress = {getDataAddress} />
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