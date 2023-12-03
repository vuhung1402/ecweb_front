import CancelOrder from "./CancelOrder"
import ConfirmedOrder from "./ConfirmedOrder"
import UnconfirmOrder from "./UnconfirmOrder"

const OrderSeller = () => {
    return(
        <div>
            <nav class=" dark:bg-gray-700 border-b-2">
                <div class="w-full px-4 py-3">
                    <div class="flex items-center w-full">
                        <ul class="flex flex-row w-full justify-evenly font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <div class="text-gray-900 dark:text-white hover:underline cursor-pointer" aria-current="page">Chưa xác nhận</div>
                            </li>
                            <li>
                                <div class="text-gray-900 dark:text-white hover:underline cursor-pointer">Đã xác nhận</div>
                            </li>
                            <li>
                                <div class="text-gray-900 dark:text-white hover:underline cursor-pointer">Đã huỷ</div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <ConfirmedOrder/> */}
                {/* <UnconfirmOrder/> */}
                <CancelOrder/>
            </nav>
        </div>
    )
}

export default OrderSeller