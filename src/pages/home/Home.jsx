import Category from "../../component/Category"
import ProductList from "../../component/ProductList"

import { useSelector } from "react-redux"

const Home = () => {
    const state = useSelector((state) => state)
    console.log("store", state)
    return(
        <div>
            <Category/>
            <ProductList/>
        </div>
    )
}

export default Home