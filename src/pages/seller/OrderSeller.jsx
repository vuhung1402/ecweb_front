import { useState } from "react"
import CancelOrder from "./CancelOrder"
import ConfirmedOrder from "./ConfirmedOrder"
import UnconfirmOrder from "./UnconfirmOrder"
import OrderList from "./OrderList"

const OrderSeller = () => {
    const [nav, setNav] = useState(1)
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
                {nav === 1 && <OrderList api = {"/orders/shop"}/>}
                {nav === 2 && <OrderList api = {"/orders/shop?status=to-pay"} />}
                {nav === 3 && <OrderList api = {"/orders/shop?status=to-confirm"} />}
                {nav === 4 && <OrderList api = {"/orders/shop?status=to-ship"} />}
                {nav === 5 && <OrderList api = {"/orders/shop?status=to-receive"}/>}
                {nav === 6 && <OrderList api = {"/orders/shop?status=completed"}/>}
                {nav === 7 && <OrderList api = {"/orders/shop?status=canceled"}/>}
            </nav>
        </div>
    )
}

export default OrderSeller