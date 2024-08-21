import TextEditor from "@component/TextEditor";
import { Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import DropDownCategory from "../DropDownCategory";
import { getCategories } from "@pages/admin/products/function";

const InforProduct = (props) => {
    const { description, idCategory, idSubCategory, code, name, price, total } = props;
    const { handleChangeInfo, handleSelectCategory } = props;

    const [state, setState] = useState({
        categories: [],
    })

    useEffect(() => {
        async function fetchData() {
            const categories = await getCategories();
            state.categories = categories;
            setState((prev) => ({ ...prev }));
        };
        fetchData();
    }, [idCategory])

    return (
        <div id="infor-product" className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center font-bold w-full">
                    <div className="w-32 min-w-32">Mã sản phẩm</div>
                    <Input
                        value={code}
                        onChange={(e) => handleChangeInfo(e, 'codeProduct')}
                        className="w-full"
                        type=""
                        placeholder="Mã sản phẩm"
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full">
                    <div className="font-bold w-32 min-w-32">Danh mục chính</div>
                    <div className="w-full">
                        <DropDownCategory
                            idSubCategory={idSubCategory}
                            idCategory={idCategory}
                            data={state.categories}
                            type='category_id'
                            handleSelectCategory={handleSelectCategory}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center font-bold w-full">
                    <div className="w-32 min-w-32">Tên sản phẩm</div>
                    <Input
                        value={name}
                        onChange={(e) => handleChangeInfo(e, 'nameProduct')}
                        type=""
                        placeholder="Tên sản phẩm"
                        className="w-full"
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full font-bold">
                    <div className="w-32 min-w-32">Danh mục phụ</div>
                    <div className="w-full">
                        <DropDownCategory
                            idSubCategory={idSubCategory}
                            idCategory={idCategory}
                            data={state.categories?.find(item => item?.category_id === idCategory)?.sub_category}
                            type='sub_category_id'
                            handleSelectCategory={handleSelectCategory}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full font-bold">
                <div className="w-32 min-w-32 hide">Giá tiền</div>
                <InputNumber
                    value={price}
                    onChange={(e) => handleChangeInfo(e, 'price')}
                    formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value?.replace(/\VND\s?|(,*)/g, '')}
                    className="w-full"
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full font-bold">
                <div className="w-32 min-w-32 hide">Kho hàng</div>
                <Input
                    value={total}
                    onChange={(e) => handleChangeInfo(e, 'total')}
                    type=""
                    placeholder="Số lượng hàng trong kho"
                    className="w-full"
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full font-bold">
                <div className="w-32 min-w-32">Mô tả</div>
                <div className="flex flex-grow">
                    <TextEditor value={description} handleChangeInfo={handleChangeInfo} />
                </div>
            </div>
        </div>
    )
}

export default InforProduct