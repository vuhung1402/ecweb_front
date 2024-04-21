import { useEffect, useState } from "react"
import Loading from "./Loading"
import { endpoint } from "../api"
import CardProduct from "./CardProduct/CardProduct"

const ProductList = () => {
  const [products, setProducts] = useState()
  
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          <h2 className="select-none text-2xl font-bold text-gray-900 mb-4">Sản phẩm</h2>
          {/* { !products && <Loading/>} */}

          <Loading/>


          <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-10">
            {/* <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/> */}
          </div>

        </div>
      </div>
  
    )
  }
  
  export default ProductList
  