import { useEffect, useState } from "react"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { endpoint } from "../../api"
import ProductList from "../../component/ProductList"
import Loading from "../../component/Loading"

const InforShop = () => {

    const [infor, setInfor] = useState()
    const [products, setProducts] = useState()
    const user = useUserPackageHook()

    useEffect(() => {
        fetch(`${endpoint}/shops/me`, {
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
                setInfor(json?.data?.shop)
                console.log("json: ", json)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    },[])

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
                setProducts(json?.data?.products)
                console.log("json: ", json)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    },[])

    

    return(
        <div>
            <div>
                <div className="flex items-center">
                    <div className=" p-2 text-2xl font-semibold">
                        {infor?.name} | 
                    </div>
                    <div>
                        Follower: {infor?.follower}
                    </div>
                </div>
                <div className="px-2 text-sm font-semibold text-orange-400">
                    {infor?.description}
                </div>
                <div className=" h-[0.5px] bg-black mt-3"></div>
            </div>

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Product</h2>
                { !products && <Loading/>}
    
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products?.map((product) => (
                    <a key={product.slug} href={`/productDetail/${product.slug}`} className="group">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img
                            src={"https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"}
                            alt={product.imageAlt}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                        </div>
                        <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                        <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                    </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InforShop