import { useLocation, useParams } from "react-router-dom"
import Filter from "../../component/Filter"

const Products = () => {
    const location = useLocation()
    console.log(location)
    return(
        <Filter search = {location?.state?.search} category = {location?.state?.category} />
    )
}

export default Products