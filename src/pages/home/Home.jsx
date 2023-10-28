import Category from "../../component/Category"
import ProductList from "../../component/ProductList"

import { useDispatch, useSelector } from "react-redux"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { userPackage } from "../../redux/actions"

const Home = () => {
    const user = useUserPackageHook()
    console.log("user: ", user)
    return(
        <div>
            <Category/>
            <ProductList/>
        </div>
    )
}

export default Home