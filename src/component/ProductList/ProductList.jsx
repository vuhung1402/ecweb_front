import React, { useState } from "react"
import CardProduct from "../CardProduct/CardProduct"
import Loading from "../Loading/Loading"
import ProductFilter from "../ProductFilter/ProductFilter"
import { Empty, List } from "antd"

const ProductList = (props) => {
    const { data, isLoadingPage } = props;
    const { handleSelect } = props;

    //truyen props dataSample

    const [products, setProducts] = useState()

    return (
        <div className="bg-white w-full">
            <div className="px-4 py-16 sm:px-6 sm:py-10 lg:w-full lg:px-8 h-full">
                <div className="flex justify-between items-center">
                    <h2 className="select-none text-2xl font-medium text-gray-900 mb-4 uppercase tracking-widest">Sản phẩm</h2>
                    <ProductFilter handleSelect={handleSelect} />
                </div>

                {isLoadingPage && (
                    <div className="w-full h-full">
                        <Loading />
                    </div>
                )}

                {
                    !isLoadingPage && (
                        <List
                            pagination={{
                                hideOnSinglePage: true,
                                pageSize: 16
                            }}
                            grid={{
                                gutter: 20,
                                xs: 1,
                                sm: 2,
                                xl: 3,
                            }}
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item>
                                    <div>
                                        <CardProduct data={item} />
                                    </div>
                                </List.Item>
                            )}
                        />
                    )
                }

            </div>
        </div>

    )
}

export default ProductList
