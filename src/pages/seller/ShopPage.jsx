import HeaderSeller from "../../component/HeaderSeller"
import OrderSeller from "./OrderSeller"
import ProductListSeller from "./Products"
import SildeBar from "./SildeBar"

const ShopPage = () => {
    return(
        <div>
            <HeaderSeller isSeller = {true} />
            <div className="flex">
                <div className=" w-1/5">
                    <SildeBar/>
                </div>
                <div className=" w-4/5">
                    {/* <ProductListSeller/> */}
                    <OrderSeller/>
                </div>
            </div>
            
        </div>
    )
}

export default ShopPage