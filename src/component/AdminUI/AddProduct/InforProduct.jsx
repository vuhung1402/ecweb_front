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
        <div id="infor-product" className=" w-full flex flex-col gap-4">
            <div className=" flex gap-3 items-center justify-between">
                <div className="flex gap-3 items-center">
                    <div className=" w-28">Mã sản phẩm</div>
                    <Input
                        value={code}
                        onChange={(e) => handleChangeInfo(e, 'codeProduct')}
                        type=""
                        placeholder="Mã sản phẩm"
                        style={{
                            width: '300px'
                        }}
                    />
                </div>
                <div className=" flex gap-3 items-center">
                    <div>Danh mục chính</div>
                    <div>
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

            <div className="flex gap-3 items-center justify-between">
                <div className=" flex gap-3 items-center">
                    <div className=" w-28">Tên sản phẩm</div>
                    <Input
                        value={name}
                        onChange={(e) => handleChangeInfo(e, 'nameProduct')}
                        type=""
                        placeholder="Tên sản phẩm"
                        style={{
                            width: '300px'
                        }}
                    />
                </div>
                <div className=" flex gap-3 items-center">
                    <div>Danh mục phụ</div>
                    <div>
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

            <div className=" flex gap-3 items-center">
                <div className=" w-28 hide">Giá tiền</div>
                <InputNumber
                    value={price}
                    onChange={(e) => handleChangeInfo(e, 'price')}
                    style={{
                        width: '300px'
                    }}
                    formatter={(value) => `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value?.replace(/\VND\s?|(,*)/g, '')}
                />
            </div>

            <div className=" flex gap-3 items-center">
                <div className=" w-28 hide">Kho hàng</div>
                <Input
                    value={total}
                    onChange={(e) => handleChangeInfo(e, 'total')}
                    type=""
                    placeholder="Số lượng hàng trong kho"
                    style={{
                        width: '300px'
                    }}
                />
            </div>

            <div className=" flex gap-3 items-center w-full">
                <div className=" w-28">Mô tả</div>
                <div className=" flex flex-grow">
                    <TextEditor value={description} handleChangeInfo={handleChangeInfo} />
                </div>
            </div>
        </div>
    )
}

export default InforProduct