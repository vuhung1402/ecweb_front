import React, { useState } from "react";
import { formatCurrencyVN } from "@utils/function";
import { useNavigate } from "react-router-dom";

import './style.scss';

const CardProduct = ({ data }) => {
    const navigate = useNavigate();

    const handleColorHover = (img) => {
        setImg(img);
    };

    const [img, setImg] = useState('');

    const handleNavigate = (route, id) => {
        navigate(
            { pathname: route },
            {
                state: { key: id }
            }
        );
    };

    return (
        <>
            <div className="w-[250px] h-auto p-2 card-product relative">
                {
                    data?.discount && (
                        <div
                            className="w-[50px] h-[24px] border border-[#ededed] absolute bg-white z-50 top-3 left-3 flex items-center justify-center text-red-400 text-[12px] font-medium">
                                {`-${'25'}%`}
                        </div>
                    )
                }
                <div
                    onClick={() => handleNavigate(`/product-detail/${data?.name}`, data?.id)}
                    className="h-[250px] w-full flex justify-center relative card-img-wrapper"
                >
                    <img
                        className={`w-auto h-full cursor-pointer`}
                        src={img.length ? img : data?.image.url}
                    />
                    <img
                        className={`w-auto h-full cursor-pointer absolute transition-opacity duration-300 hover-img`}
                        src={data?.imageHover?.url}
                    />
                </div>
                <div
                    onClick={() => handleNavigate(`/product-detail/${data?.name}`, data?.id)}
                    className="hover:text-blue-500 cursor-pointer text-sm font-normal transition-all tracking-wider"
                >
                    {data?.name}
                </div>
                <div className="font-normal text-sm tracking-wider">
                    {formatCurrencyVN(data?.price)}
                </div>
                <div className="mt-1 flex gap-3">
                    {data?.color?.map((item, index) => {
                        return (
                            <div
                                style={{
                                    backgroundColor: item?.code_color,
                                }}
                                onMouseLeave={() => setImg('')}
                                onMouseEnter={() => handleColorHover(item?.image?.url)}
                                key={`color-${index}`}
                                className={`cursor-pointer mr-2 hover:border border-black px-2 py-1 w-[24px] h-[24px] rounded-full`}
                            ></div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default CardProduct;
