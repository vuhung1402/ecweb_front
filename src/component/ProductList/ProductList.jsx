import React, { useEffect, useState } from "react"
import { endpoint } from "../../api"
import CardProduct from "../CardProduct/CardProduct"
import { useLocation, useParams } from "react-router-dom"
import Loading from "../Loading/Loading"
import ProductFilter from "../ProductFilter/ProductFilter"

const ProductList = ({handleSelect}) => {

  //truyen props dataSample

  const [products, setProducts] = useState()

    return (
      <div className="bg-white w-full">
        <div className=" px-4 py-16 sm:px-6 sm:py-10 lg:w-full lg:px-8">
          <div className="flex justify-between items-center">
            <h2 className="select-none text-2xl font-bold text-gray-900 mb-4">Sản phẩm</h2>
            <ProductFilter handleSelect = {handleSelect}/>
          </div>

          {/* <Loading/> */}


          <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-10">
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
            <CardProduct/>
          </div>

        </div>
      </div>
  
    )
  }
  
  export default ProductList
  