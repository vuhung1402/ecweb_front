import React from "react";
import { Breadcrumb, List, Tooltip } from "antd";

import CardProduct from "@widgets/CardProduct/CardProduct";
import ProductFilter from "@widgets/ProductFilter/ProductFilter";
import ProductSearch from "@widgets/ProductSearch";
import { CameraFilled } from "@ant-design/icons";
import ModalFindByImage from "@widgets/ModalFindByImage";
import { useLocation } from "react-router-dom";

const ProductList = (props) => {
    const { data, name, openModalFindByImage } = props;
    const { handleSelect, onSearch, onChange, handleOpenModalFindByImage, handleDataFindByImage } = props;

    const location = useLocation();

    const breadcurmbItems = [
        {
            title: <a href="/">Trang chủ</a>,
        },
        {
            title: <a href="/products/all">Sản phẩm</a>
        },
        {
            title: <p>{location?.state?.value ?? ''}</p>
        }
    ]

    return (
        <div className="bg-gray-50 w-full">
            <div className="px-4 sm:px-6 sm:py-10 w-full lg:px-8 h-full">
                <div className="w-full flex flex-col gap-3 justify-between mb-4">
                    <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-10">
                        <ProductSearch onSearch={onSearch} name={name} onChange={onChange} />

                        <ProductFilter handleSelect={handleSelect} />

                        <div
                            className="cursor-pointer w-full sm:w-auto flex justify-end"
                            onClick={handleOpenModalFindByImage}
                        >
                            <Tooltip title="Tìm kiếm bằng hình ảnh">
                                <CameraFilled
                                    style={
                                        { fontSize: '30px', color: '#08c' }
                                    }
                                    className="h-[40px]"
                                />
                            </Tooltip>
                        </div>
                    </div>

                    <div>
                        <Breadcrumb className="font-bold" items={breadcurmbItems} />
                    </div>
                </div>
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
            </div>
            <ModalFindByImage
                openModalFindByImage={openModalFindByImage}
                handleOpenModalFindByImage={handleOpenModalFindByImage}
                handleDataFindByImage={handleDataFindByImage}
            />
        </div>

    )
}

export default ProductList
