import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";

import { formatCurrencyVN } from "@utils/function";

const { Meta } = Card;

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
        <Card
            hoverable
            rootClassName="card-product relative h-auto"
            className="border border-[#f0f0f0]"
            style={{width: 250}}
            cover={
                <div
                    onClick={() => handleNavigate(`/product-detail/${data?.name}`, data?.id)}
                    className="h-[250px] w-full flex justify-center relative card-img-wrapper"
                >
                    <img
                        className={`w-auto h-full cursor-pointer`}
                        src={img.length ? img : data?.primary_image?.url}
                    />
                    <img
                        className={`w-auto h-full cursor-pointer top-0 absolute transition-all duration-300 hover-img`}
                        src={data?.imageHover?.url}
                    />
                </div>
            }
        >
            <Meta
                title={data?.name}
                description={
                    <>
                        <div className="font-normal text-sm tracking-wider">
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
                                    ></div>
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
