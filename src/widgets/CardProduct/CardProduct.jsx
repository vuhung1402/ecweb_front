import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "antd";

import { formatCurrencyVN } from "@utils/function";

import './style.scss';

const { Meta } = Card;

const CardProduct = ({ data }) => {
    const navigate = useNavigate();

    const pathname = useLocation().pathname

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

        if (pathname.includes('product-detail')) {
            window.location.reload()
        }

    };

    return (
        <Card
            hoverable
            rootClassName="card-product relative h-auto"
            className="!w-[300px] border border-[#f0f0f0]"
            cover={
                <div
                    onClick={() => handleNavigate(`/product-detail/${data?.name}`, data?.id)}
                    className="h-[300px] w-full flex justify-center relative card-img-wrapper"
                >
                    <img
                        className={`w-auto h-full cursor-pointer`}
                        src={img.length ? img : data?.image?.url}
                        alt="main-img"
                    />
                    <img
                        className={`w-auto h-full cursor-pointer top-0 absolute transition-all duration-300 hover-img`}
                        src={data?.imageHover?.url}
                        alt="hover-img"
                    />
                </div>
            }
        >
            <Meta
                title={data?.name}
                className="font-semibold"
                description={
                    <>
                        <div className="font-semibold text-sm tracking-wider">
                            {formatCurrencyVN(data?.price)}
                        </div>
                        <div className="mt-2 flex gap-3">
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
                                    />
                                );
                            })}
                        </div>
                    </>
                }
            />
            {
                data?.discount && (
                    <div
                        className="w-[50px] h-[24px] border border-[#ededed] absolute bg-white z-50 top-3 left-3 flex items-center justify-center text-red-400 text-[12px] font-bold">
                            {`-${'25'}%`}
                    </div>
                )
            }
        </Card>
    );
};

export default CardProduct;
