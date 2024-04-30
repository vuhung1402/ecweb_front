import { useDispatch } from "react-redux"
import { clear } from "../../redux/actions"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { endpoint } from "../../api"


const Profile = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const user = useUserPackageHook()

    const [infor, setInfor] = useState()

    const myAlert = () => {
        const response = window.confirm("Vui lòng đăng nhập lại!!!");
        if(response){
            dispatch(clear());
            navigate("/login")
        }
    }

    useEffect(() => {
        fetch(`${endpoint}/users/get_info/${user?.data}/`, {
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
            
            if(json?.success){
                setInfor(json)
            }else{
                // myAlert()
                console.log("false")
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }, [])

    const [content, setContent] = useState(1)

    const handleLogOut = () => {
        dispatch(clear())
        navigate('/')
    }
    
    return( 
        <div>
            <div className=" flex flex-col items-center justify-center font-semibold text-5xl gap-8 p-5 border-b-[1px]">
                <h1>Tài khoản của bạn</h1>
                <span className="bg-black p-[1.5px] w-14 flex items-center justify-center"></span>
            </div>
            <div className=" flex">
                <div className=" w-1/4 p-5">
                    <p className=" uppercase font-bold mb-3">Tài khoản</p>
                    <div className=" mt-2"><a href="/account" className=" hover:text-blue-500 cursor-pointer">Thông tin tài khoản</a></div>
                    <div className=" mt-2"><a href="/address" className=" hover:text-blue-500 cursor-pointer">Danh sách địa chỉ</a></div>
                    <div onClick={() => handleLogOut()} className=" mt-2"><a className=" hover:text-blue-500 cursor-pointer">Đăng xuất</a></div>
                </div>
                <div className=" w-3/4 p-5 mb-7">
                    <div className=" uppercase font-bold mb-3 border-b-[1px] pb-1">Thông tin tài khoản</div>

                    <div>
                        {infor?.name && <p className=" font-medium">{infor?.name}</p>}
                        {infor?.address && <div className=" text-sm">{infor?.address}</div>}
                        {infor?.email && <div className=" text-sm">{infor?.email}</div>}
                        <div className=" mt-1"><a className="hover:text-blue-500 cursor-pointer text-gray-500">Xem địa chỉ</a></div>
                    </div>

                    <div className=" mt-6">
                        <div className=" uppercase font-semibold mb-3">Danh sách đơn hàng mới nhất</div>

                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className=" text-center">
                                    <th scope="col" class="px-6 py-3">
                                        Mã đơn hàng
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Ngày đặt
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Thành tiền
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Trạng thái thanh toán
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Vận chuyển
                                    </th>
                                </tr>
                            </thead>
                            <tbody className=" text-center">
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-500 whitespace-nowrap dark:text-white">
                                        <a className="hover:text-blue-500" href="#">#100325</a>
                                    </th>
                                    <td class="px-6 py-4">
                                        06/07/2023	
                                    </td>
                                    <td class="px-6 py-4">
                                        116,000₫
                                    </td>
                                    <td class="px-6 py-4">
                                        Đã hoàn tất
                                    </td>
                                    <td class="px-6 py-4">
                                        Đã giao hàng
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile