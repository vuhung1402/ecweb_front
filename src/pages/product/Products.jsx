import { useLocation, useParams } from "react-router-dom"
import Filter from "../../component/Filter"
import ProductList from "../../component/ProductList"

const Products = () => {
    const location = useLocation()
    console.log(location)
    return(
        <div className=" flex">
            <div className=" w-1/4">
                <Filter/>
            </div>
            <div className=" flex flex-grow">
                <ProductList/>
            </div>
        </div>
    )
}

export default Products