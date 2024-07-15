import React, { useState } from "react"
import CardProduct from "../CardProduct/CardProduct"
import Loading from "../Loading/Loading"
import ProductFilter from "../ProductFilter/ProductFilter"
import { Empty } from "antd"

const ProductList = ({ handleSelect, data }) => {

    //truyen props dataSample

    const [products, setProducts] = useState()

    return (
        <div className="bg-white w-full">
            <div className=" px-4 py-16 sm:px-6 sm:py-10 lg:w-full lg:px-8">
                <div className="flex justify-between items-center">
                    <h2 className="select-none text-2xl font-medium text-gray-900 mb-4 uppercase tracking-widest">Sản phẩm</h2>
                    <ProductFilter handleSelect={handleSelect} />
                </div>

                {data === undefined && <Loading />}

                {data?.length === 0 && <Empty />}

                <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 xl:gap-x-10">
                    {
                        data?.map((item, index) => {
                            return (
                                <div key={`product-card-${index}`}>
                                    <CardProduct data={item} />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>

    )
}

export default ProductList
