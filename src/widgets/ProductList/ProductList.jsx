import React from "react";
import { List, Tooltip } from "antd";

import CardProduct from "@widgets/CardProduct/CardProduct";
import ProductFilter from "@widgets/ProductFilter/ProductFilter";
import ProductSearch from "@widgets/ProductSearch";
import { CameraFilled } from "@ant-design/icons";
import ModalFindByImage from "@widgets/ModalFindByImage";

const ProductList = (props) => {
    const { data, name, openModalFindByImage } = props;
    const { handleSelect, onSearch, onChange, handleOpenModalFindByImage, handleDataFindByImage } = props;

    return (
        <div className="bg-white w-full">
            <div className="px-4 sm:px-6 sm:py-10 w-full lg:px-8 h-full">
                <div className="flex flex-col gap-3 sm:flex-row justify-between sm:items-center mb-4">
                    <h2 className="select-none hidden sm:block text-2xl font-bold text-gray-900 uppercase tracking-widest">Sản phẩm</h2>
                    <div className="flex gap-3">
                        <ProductSearch onSearch={onSearch} name={name} onChange={onChange} />
                        <div
                            className="cursor-pointer"
                            onClick={handleOpenModalFindByImage}
                        >
                            <Tooltip title="Tìm kiếm bằng hình ảnh">
                                <CameraFilled
                                    style={
                                        { fontSize: '30px', color: '#08c' }
                                    }
                                />
                            </Tooltip>
                        </div>
                        <ProductFilter handleSelect={handleSelect} />
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
