import { useProductDetailContext } from "@_components/ProductDetail_v2/context"
import { useGetRelatedProducts } from "@pages/Product/function"
import CardProduct from "@widgets/CardProduct/CardProduct"
import { List } from "antd"
import React from "react"

const RelatedProducts = () => {
    const { product } = useProductDetailContext()

    const cateforyId = product?.category_id

    const { data } = useGetRelatedProducts(cateforyId)

    const relatedProducts = data?.productListAll_DataFormat?.slice(0,4)

    return (
        <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Sản phẩm tương tự</h2>

            <List
                pagination={{
                    hideOnSinglePage: true,
                    pageSize: 4
                }}
                grid={{
                    gutter: 20,
                    xxl: 4,
                    xl: 3,
                    lg: 3,
                    md: 3,
                    sm: 2,
                    column: 1
                }}
                dataSource={relatedProducts}
                renderItem={(item) => (
                    <List.Item className="!flex items-center !w-[300px]">
                        <CardProduct data={item} />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default RelatedProducts