import { useParams } from "react-router-dom"
import Filter from "../../component/Filter"

const Products = () => {
    
    const {search} = useParams()

    return(
        <Filter search = {search} />
    )
}

export default Products