import { useEffect } from "react"
import Loading from "../../component/Loading"
import { useState } from "react"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { endpoint } from "../../api"
import UpdateProduct from "./UpdateProduct"
import { useNavigate } from "react-router-dom"

const AllProduct = () => {
    const [data, setData] = useState()
    const user = useUserPackageHook()
    const [update, setUpdate] = useState(false)
    const [index, setIndex] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${endpoint}/shops/me/products`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${user?.accessToken}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if(!response.ok){
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            if(json?.success){
                setData(json?.data?.products)
                console.log("json: ", json)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    },[update])

    const handleClick = (product) => {
        // setUpdate(!update)
        navigate(
            `/updateProductSeller`, 
            {
              state:{
                product: product
              } 
            }
          )
    }


    return(
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                { !data && <Loading/>}
                {data?.products?.length === 0 && <div className=" font-semibold">Hiện tại chưa có sản phẩm nào ở trong cửa hàng</div>}
        
                <div className={update === true ?"" : "grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"}>
                    {data?.map((product, index) =>{ return (
                        <>
                            {update === false && 
                                (<div onClick={() => handleClick(product)} className="group cursor-pointer">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <img
                                        src={"https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"}
                                        // alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    />
                                    </div>
                                    <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                    {/* <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p> */}
                                </div>)
                            }
                            {/* {update && <UpdateProduct setUpdate={setUpdate} slug={product}/>} */}
                        </>    
                    )})}
                </div>
            </div>
        </div>
    )
}

export default AllProduct