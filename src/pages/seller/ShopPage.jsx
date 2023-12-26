import { useState } from "react"
import HeaderSeller from "../../component/HeaderSeller"
import OrderSeller from "./OrderSeller"
import ProductListSeller from "./Products"
import SildeBar from "./SildeBar"
import InforShop from "./InforShop"

const ShopPage = () => {
    const [sildeBar, setSildeBar] = useState(1)

    return(
        <div className=" h-auto">
            <HeaderSeller isSeller = {true} />
            <div className="flex h-auto">
                <div className=" w-1/5 h-auto">
                    <SildeBar setSildeBar = {setSildeBar} />
                </div>
                <div className=" w-4/5">
                    {sildeBar === 1 && <InforShop/>}
                    {sildeBar === 3 && <ProductListSeller/>}
                    {sildeBar === 4 && <OrderSeller/>}
                </div>
            </div>
            
        </div>
    )
}

export default ShopPage