import { useState } from "react"
import SidebarAdmin from "./SildeBar"
import HeaderSeller from "../../component/HeaderSeller"
import OrdersAdmin from "./Order"

const HomePage = () => {
    const [sildeBar, setSildeBar] = useState(1)


    return(
        <div>
            <HeaderSeller isSeller = {true} />
            <div className="flex">
                <div className=" w-1/5">
                    <SidebarAdmin setSildeBar = {setSildeBar} />
                </div>
                <div className=" w-4/5">
                    <OrdersAdmin/>
                </div>
            </div>
        </div>
    )
}

export default HomePage