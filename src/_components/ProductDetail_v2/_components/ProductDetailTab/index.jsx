import React from "react";
import { useProductDetailContext } from "@_components/ProductDetail_v2/context";
import { Card, Tabs } from "antd";

const TabContent = () => {
    const { product } = useProductDetailContext()

    return (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2">
            <div>
                <div className="text-[14px] font-bold">Mô tả</div>

                <div
                    className="mt-4"
                    dangerouslySetInnerHTML={{ __html: product?.description }}
                />
            </div>
            <div className="bg-green-50 rounded-xl p-6 h-fit">
                <h4 className="font-semibold text-green-900 mb-3">🌱 Cam kết bền vững</h4>
                 
                <p className="text-green-800 text-sm">
                Sản phẩm được sản xuất theo tiêu chuẩn thân thiện môi trường, sử dụng nguyên liệu tái chế và quy
                trình sản xuất xanh.
                </p>
            </div>
        </div>
    )
}

const ProductDetailTab = () => {
    const tabsItem = [{
        key: 'mo-ta',
        label: 'Mô tả',
        children: <TabContent />
    }]

    return (
        <div className="w-full mb-10 shadow-lg">
            <Card>
                <Tabs size="large" type="card" defaultActiveKey="mo-ta" items={tabsItem}></Tabs>
            </Card>
        </div>
    )
}

export default ProductDetailTab