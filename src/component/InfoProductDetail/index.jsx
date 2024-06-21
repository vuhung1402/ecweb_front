import { Button, message } from "antd"
import { useEffect, useState } from "react"
import { VND, addKeyToArraySize, formatCurrencyVN, getNotInvalidColor } from "../../utils/function"
import IconClose from "@icon/iconClose.svg"
import React from "react"


const InfoProductDetail = ({ data }) => {

    const [state, setState] = useState({
        number: 1,
        color: [],
        sizes: [],
        selectColor: {},
        textColor: '',
        selectSize: {},
        loadingAddCart: false,
    });

    useEffect(() => {
        if (data) {
            let color = [];
            if (data?.array_color?.length > 0) {
                data?.array_color?.map((item) => {
                    const sizeArray = addKeyToArraySize(item?.array_sizes)
                    // console.log(sizeArray)
                    color.push({
                        code: item?.code_color,
                        name: item?.name_color,
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
        // console.log(name);
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
        // console.log("ObjectColor from InfoProductDetail: ", objectColor);
        state.sizes = objectColor?.sizes;
        state.selectColor = item;
        state.selectSize = {};
        setState((prev) => ({ ...prev }));
    };

    const handleSelectSize = (item) => {
        if (item?.invalid) return;

        state.selectSize = item;
        setState((prev) => ({ ...prev }));
    }

    const handleAddToCart = async () => {
        const cart = {
            product_id: data?.product_id,
            size: state.selectSize?.name_size,
            color: state.selectColor?.name,
            codeColor: state.selectColor?.code,
            sl: state.number,
        }
        console.log({ cart });
        setState((prev) => ({...prev, loadingAddCart:true}));
        setTimeout(() => {
            setState((prev) => ({...prev, loadingAddCart:false}));
        }, 1000)
    }

    return (
        <div className=" w-full sticky h-fit top-20">
            <div className=" text-[20px] font-semibold py-3 border-b-[1px]">{data?.name}</div>
            <div className=" text-red-500 text-[18px] font-semibold opacity-[0.92] border-b-[1px] py-3">
                {formatCurrencyVN(data?.price)}
            </div>
            <div id="text-name-color" className="text-[13px] font-light my-2" >{state.textColor?.toUpperCase()}</div>
            <div className="pb-2 cursor-default flex gap-3 items-center">
                {
                    state.color?.map((item, index) => {
                        return (

                            <div
                                onMouseEnter={() => handleChangeNameColor(item?.name)}
                                onClick={() => handleSelectColor(item)}
                                onMouseLeave={handleMouseLeave}
                                key={`product-color-${index}`}
                                className={` relative h-[31px] w-[31px] cursor-pointer rounded-full flex justify-center items-center ${state.selectColor?.code === item?.code ? 'border border-[#808284]' : ''}`}
                            >
                                <div
                                    className={` h-[23px] w-[23px] rounded-full ${item.invalid ? ' opacity-5' : ''}`}
                                    style={{ backgroundColor: item?.code }}
                                >
                                </div>
                                {item.invalid &&
                                    (<div className=" absolute">
                                        <IconClose />
                                    </div>)
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex gap-3 pb-3 items-center border-b">
                {state.sizes?.map((item, index) => {
                    return (
                        <>
                            <div
                                onClick={() => handleSelectSize(item)}
                                className={` relative w-[40px] h-[40px] text-center border flex items-center justify-center 
                                            ${item?.name_size === state.selectSize?.name_size ? 'bg-black text-white' : 'text-black'} ${item?.invalid ? ' cursor-default' : ' cursor-pointer'}`}
                                key={`product-size-${index}`}
                            >
                                <div className={`text-[16px] ${item?.invalid ? ' opacity-30' : ''}`}>{item?.name_size}</div>
                            </div>
                        </>
                    )
                })}
            </div>

            <div className="flex items-center mt-4">
                <div onClick={() => handleNumber("minus")} className="p-3 bg-[rgb(245,245,245)]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                    </svg>
                </div>
                <input min={1} className=" outline-none border-none shadow-transparent w-28 text-center" value={state.number} type="number" />
                <div onClick={() => handleNumber("plus")} className=" p-3 bg-[rgb(245,245,245)]">
                    <svg width="15" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
            </div>

            {/* <div className="w-full mt-3 flex items-center justify-center h-[50px] cursor-pointer">
                <div
                    onClick={handleAddToCart}
                    className=" text-white font-medium select-none"
                >
                    Thêm vào giỏ
                </div>
                <Button type="primary">Primary Button</Button>
            </div> */}
            <Button
                onClick={handleAddToCart}
                loading={state.loadingAddCart}
                type="primary"
                className=" w-full mt-3 p-4 !h-auto font-medium"
            >
                Thêm vào giỏ hàng
            </Button>

            <div className=" mt-5">
                <div className=" text-[14px] font-bold">Mô tả</div>

                <div
                    className=" mt-4"
                    dangerouslySetInnerHTML={{ __html: data?.description }}
                />
            </div>
        </div>
    )
}

export default InfoProductDetail