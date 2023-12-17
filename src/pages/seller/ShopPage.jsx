import { useState } from "react"
import HeaderSeller from "../../component/HeaderSeller"
import OrderSeller from "./OrderSeller"
import ProductListSeller from "./Products"
import SildeBar from "./SildeBar"

const ShopPage = () => {
    const [sildeBar, setSildeBar] = useState(1)

    return(
        <div>
            <HeaderSeller isSeller = {true} />
            <div className="flex">
                <div className=" w-1/5">
                    <SildeBar setSildeBar = {setSildeBar} />
                </div>
                <div className=" w-4/5">
                    {sildeBar === 3 && <ProductListSeller/>}
                    {sildeBar === 4 && <OrderSeller/>}
                </div>
            </div>
            
        </div>
    )
}

export default ShopPage