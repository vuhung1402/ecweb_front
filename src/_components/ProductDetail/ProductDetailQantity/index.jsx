import React from "react";

import IconMinus from '@icon/iconMinus.svg';
import IconPlus from '@icon/iconPlus.svg';

const ProductDetailQantity = (props) => {

    const { number, handleNumber } = props;

    return (
        <div className="my-3">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Số lượng</h3>

            <div className="flex gap-3 items-center mt-4">
                <div
                    onClick={() => handleNumber("minus")}
                    className="p-3 bg-[rgb(245,245,245)] cursor-pointer hover:bg-opacity-60"
                >
                    <IconMinus />
                </div>

                <input
                    min={1}
                    className="outline-none text-xl border-none shadow-transparent w-14 text-center"
                    value={number}
                    type="number"
                    readOnly
                />

                <div
                    onClick={() => handleNumber("plus")}
                    className=" p-3 bg-[rgb(245,245,245)] cursor-pointer hover:bg-opacity-60"
                >
                    <IconPlus />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailQantity;