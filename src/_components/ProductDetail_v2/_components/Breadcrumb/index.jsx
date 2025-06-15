import React, { useMemo } from "react";

import { Breadcrumb as BreadcrumbComponent } from 'antd'

import { useProductDetailContext } from "@_components/ProductDetail_v2/context"

const Breadcrumb = () => {
    const { product } = useProductDetailContext()

    const breadcurmbItems = useMemo(() => {
        return [
            {
                title: <a href="/">Trang chủ</a>,
            },
            {
                title: <a href="/products/all">Sản phẩm</a>
            },
            {
                title: <p>{product?.name ?? ''}</p>
            }
        ]
    },[product])

    return (
        <div className="w-full mb-3">
            <BreadcrumbComponent items={breadcurmbItems} />
        </div>
    )
}

export default Breadcrumb