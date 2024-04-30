
import { useEffect, useState } from "react"
import AddressInfor from "../AddressInfor/AddressInfor"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { endpoint } from "../../api"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { clear } from "../../redux/actions"
import InsertAddress from "../InsertAddress/InsertAddress"

const Address = () => {
    const dispatch = useDispatch()
    const data = useUserPackageHook()
    const navigate = useNavigate()
    const user = useUserPackageHook();

    const [address, setAddress] = useState([])

    // console.log(data?.accessToken)

    useEffect(() => {
        fetch(`${endpoint}/users/get_address/${user?.data}/`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if(!response.ok){
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            console.log(json)
            setAddress(json)
            
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }, [])

    const [updateAddress, setUpdateAddress] = useState(false)
    const [addAddress, setAddAddress] = useState(false)

    const handleLogOut = () => {
        dispatch(clear())
        navigate('/')
    }


    return(
        <div>
            <div className=" flex flex-col items-center justify-center font-semibold text-5xl gap-8 p-5 border-b-[1px]">
                <h1>Thông tin địa chỉ</h1>
                <span className="bg-black p-[1.5px] w-14 flex items-center justify-center"></span>
            </div>
            <div className=" flex">
                <div className=" w-1/4 p-5">
                    <p className=" uppercase font-bold mb-3">Tài khoản</p>
                    <div className=" mt-2"><a href="/account" className=" hover:text-blue-500 cursor-pointer">Thông tin tài khoản</a></div>
                    <div className=" mt-2"><a href="/address" className=" hover:text-blue-500 cursor-pointer">Danh sách địa chỉ</a></div>
                    <div onClick={() => handleLogOut()} className=" mt-2"><a className=" hover:text-blue-500 cursor-pointer">Đăng xuất</a></div>
                </div>

                <div className="w-3/4 p-5 flex">

                    <div className=" w-1/2">
                        {/* {updateAddress ? <UpdateAddress/> : <AddressInfor/>} */}
                        {address?.map((item) => {return <AddressInfor address={item} />})}

                    </div>

                    <div className=" w-1/2 px-3">
                        <div className="px-3 flex flex-col gap-3">
                            <button type="button" onClick={() => setAddAddress(!addAddress)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Nhập địa chỉ mới</button>
                            {
                                addAddress &&
                                (
                                    <InsertAddress setAddAddress={setAddAddress} />
                                )
                            }
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Address