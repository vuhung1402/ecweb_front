import { useLocation, useParams } from "react-router-dom"
import ProductList from "../../component/ProductList"

const ShopProfile = () => {
    const {shopId} = useParams()
    const location = useLocation()
    return(
        <div>
            <div className=" p-2 text-2xl font-semibold">
                {location?.state?.name}
            </div>
            <ProductList shopId = {shopId} />
        </div>
    )
}

export default ShopProfile