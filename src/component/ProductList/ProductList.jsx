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
            <div className="px-4 sm:px-6 sm:py-10 w-full lg:px-8 h-full">
                <div className="flex flex-col gap-3 sm:flex-row justify-between sm:items-center mb-4">
                    <h2 className="select-none hidden sm:block text-2xl font-bold text-gray-900 uppercase tracking-widest">Sản phẩm</h2>
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
                                xxl: 5,
                                xl: 4,
                                lg: 3,
                                md: 3,
                                sm: 2,
                                column: 1
                            }}
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item className="!flex items-center !justify-center">
                                    <CardProduct data={item} />
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
