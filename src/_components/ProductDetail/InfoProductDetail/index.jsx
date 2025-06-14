import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";

import { addKeyToArraySize, getNotInvalidColor, logAgain } from "@utils/function";
import useGetCartQuantity from "@hooks/useGetCartQuantity";
import { addToCart } from "@pages/Product/function";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";

import { InfoProductDetailColor, InfoProductDetailColorName, InfoProductDetailHeader } from "@pages/ProductDetail/ProductDetail";
import ProductDetailColorPick from "../ProductDetailColorPick";
import ProductDetailSize from "../ProductDetailSize";
import ProductDetailQantity from "../ProductDetailQantity";
import { SUCCESS } from "@utils/message";

const ID_TEXT_NAME_COLOR='text-name-color'

const InfoProductDetail = ({ data, handleGotoImage }) => {
    
    const [state, setState] = useState({
        number: 1,
        color: [],
        sizes: [],
        selectColor: {},
        textColor: '',
        selectSize: {},
        loadingAddCart: false,
    });

    const navigate = useNavigate();
    const { getQuantity } = useGetCartQuantity()

    useEffect(() => {
        if (data) {
            let color = [];
            if (data?.array_color?.length > 0) {
                data?.array_color?.map((item) => {
                    const sizeArray = addKeyToArraySize(item?.array_sizes)
                    color.push({
                        code: item?.code_color,
                        name: item?.name_color,
                        image: item?.image?.url,
                        imageUid: item?.image?.uid,
                        invalid: item?.total_number_with_color === 0,
                        sizes: sizeArray,
                    });
                });
            };

            const notInvalidColor = getNotInvalidColor(color);

            state.color = color;
            state.sizes = notInvalidColor?.sizes;
            state.selectColor = notInvalidColor;
            state.textColor = notInvalidColor?.name;
            setState(prev => ({ ...prev }));
        };
    }, [data]);

    const handleNumber = (params) => {
        if (state.number > 1) {
            if (params === "minus") {
                setState(prev => ({ ...prev, number: prev.number - 1 }))
            }
        }

        if (params === "plus") {
            setState(prev => ({ ...prev, number: prev.number + 1 }))
        }
    }

    const handleChangeNameColor = (name) => {
        setState(prev => ({ ...prev, textColor: name }));
    };

    const handleMouseLeave = () => {
        const { selectColor } = state;
        state.textColor = selectColor?.name;
        setState(prev => ({ ...prev }));
    };

    const handleSelectColor = (item) => {
        if (item.invalid) return;

        const objectColor = state.color?.find(itemColor => itemColor?.code === item.code);
        state.sizes = objectColor?.sizes;
        state.selectColor = item;
        state.selectSize = {};
        handleGotoImage(item?.imageUid)
        setState((prev) => ({ ...prev }));
    };

    const handleSelectSize = (item) => {
        if (item?.invalid) return;

        state.selectSize = item;
        setState((prev) => ({ ...prev }));
    }

    const handleAddToCart = async () => {
        const cart = {
            code: data?.code,
            product_id: data?.product_id,
            product_name: data?.name,
            size: state.selectSize?.name_size,
            image_hover: state.selectColor?.image === undefined ? data?.primary_image?.url : state.selectColor?.image,
            color: state.selectColor?.name,
            quantity: state.number,
            price_per_one: data?.price,
        }

        setState((prev) => ({ ...prev, loadingAddCart: true }));
        const result = await addToCart(cart);
        if (result?.success) {
            getQuantity();
            setState((prev) => ({ ...prev, loadingAddCart: false }));
            message.success(SUCCESS);
        } else {
            if (result?.message === TOKEN_INVALID || result?.message === NOT_AUTHENTICATION) {
                logAgain();
                navigate('/login');
            } else {
                message.error(result?.message);
                setState((prev) => ({ ...prev, loadingAddCart: false }));
            }
        }
    }

    return (
        <div className="w-full sticky h-fit top-20">
            <InfoProductDetailHeader
                name={data?.name}
                price={data?.price}
            />
            <InfoProductDetailColor>
                <InfoProductDetailColorName id={ID_TEXT_NAME_COLOR} colorName={state.textColor?.toUpperCase()} />
                <ProductDetailColorPick
                    color={state?.color}
                    selectColor={state.selectColor}
                    handleMouseLeave={handleMouseLeave}
                    handleSelectColor={handleSelectColor}
                    handleChangeNameColor={handleChangeNameColor}
                />
            </InfoProductDetailColor>

            <ProductDetailSize
                sizes={state.sizes}
                selectSize={state.selectSize}
                handleSelectSize={handleSelectSize}
            />

            <ProductDetailQantity
                number={state.number}
                handleNumber={handleNumber}
            />

            <Button
                onClick={handleAddToCart}
                loading={state.loadingAddCart}
                disabled={Object.keys(state.selectSize).length === 0}
                type="primary"
                className=" w-full mt-3 p-4 !h-auto font-bold uppercase"
            >
                Thêm vào giỏ hàng
            </Button>

            <div className="mt-5">
                <div className="text-[14px] font-bold">Mô tả</div>

                <div
                    className="mt-4"
                    dangerouslySetInnerHTML={{ __html: data?.description }}
                />
            </div>
        </div>
    )
}

export default InfoProductDetail