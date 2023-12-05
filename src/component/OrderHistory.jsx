import { useEffect, useState } from "react"
import { useUserPackageHook } from "../redux/hooks/userHook"
import { endpoint } from "../api"
import Orders from "../pages/profile/Orders"

const OrderHistory = () => {

    const [nav, setNav] = useState(1)

    // const user = useUserPackageHook()

    // const [orders, setOrders] = useState()

    // useEffect(() => {
    //     fetch(`${endpoint}/orders/me`, {
    //         method: "GET",
    //         headers: {
    //             'Authorization': `Bearer ${user?.accessToken}`,
    //             'Content-Type': 'application/json',
    //         },
    //     }).then((response) => {
    //         if(!response.ok){
    //             throw new Error("Netword response not ok")
    //         }
    //         return response.json()
    //     }).then((json) => {
    //         if(json?.success){
    //             setOrders(json?.data?.orders)
    //             console.log(json?.data?.orders)
    //         }
    //     }).catch((error) => {
    //         console.error("Error: ", error)
    //     })
    // },[])

    // const handleCancel = (id) => {
    //     fetch(`${endpoint}/orders/${id}/me`, {
    //         method: "DELETE",
    //         headers: {
    //             'Authorization': `Bearer ${user?.accessToken}`,
    //             'Content-Type': 'application/json',
    //         },
    //     }).then((response) => {
    //         if(!response.ok){
    //             throw new Error("Netword response not ok")
    //         }
    //         return response.json()
    //     }).then((json) => {
    //         if(json?.success){
    //             console.log(json?.data?.orders)
    //         }
    //     }).catch((error) => {
    //         console.error("Error: ", error)
    //     })
    // }

    return(
        <div>
            <nav class=" dark:bg-gray-700 border-b-2">
                <div class="w-full px-4 py-3">
                    <div class="flex items-center w-full">
                        <ul class="flex flex-row w-full justify-evenly font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <div onClick={() => setNav(1)} className={`text-gray-900 dark:text-white hover:underline cursor-pointer ${nav === 1 && "underline"}`} aria-current="page">Tất cả</div>
                            </li>
                            <li>
                                <div onClick={() => setNav(2)} className={`text-gray-900 dark:text-white hover:underline cursor-pointer ${nav === 2 && "underline"}`} aria-current="page">Chờ thanh toán</div>
                            </li>
                            <li>
                                <div onClick={() => setNav(3)} className={`text-gray-900 dark:text-white hover:underline cursor-pointer ${nav === 3 && "underline"}`}>Chờ xác nhận</div>
                            </li>
                            <li>
                                <div onClick={() => setNav(4)} className={`text-gray-900 dark:text-white hover:underline cursor-pointer ${nav === 4 && "underline"}`}>Chờ lấy hàng</div>
                            </li>
                            <li>
                                <div onClick={() => setNav(5)} className={`text-gray-900 dark:text-white hover:underline cursor-pointer ${nav === 5 && "underline"}`}>Đang giao</div>
                            </li>
                            <li>
                                <div onClick={() => setNav(6)} className={`text-gray-900 dark:text-white hover:underline cursor-pointer ${nav === 6 && "underline"}`}>Đã giao</div>
                            </li>
                            <li>
                                <div onClick={() => setNav(7)} className={`text-gray-900 dark:text-white hover:underline cursor-pointer ${nav === 7 && "underline"}`}>Đơn huỷ</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {nav === 1 && <Orders api = {"/orders/me"}/>}
            {nav === 2 && <Orders api = {"/orders/me?status=to-pay"} />}
            {nav === 3 && <Orders api = {"/orders/me?status=to-confirm"} />}
            {nav === 4 && <Orders api = {"/orders/me?status=to-ship"} />}
            {nav === 5 && <Orders api = {"/orders/me?status=to-receive"}/>}
            {nav === 6 && <Orders api = {"/orders/me?status=completed"}/>}
            {nav === 7 && <Orders api = {"/orders/me?status=canceled"}/>}

        </div>
    )
}

export default OrderHistory