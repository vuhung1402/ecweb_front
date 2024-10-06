import React from "react";

import IconClose from "@icon/iconClose.svg";

const ProductDetailColorPick = (props) => {

    const { color, selectColor } = props;
    const { handleMouseLeave, handleChangeNameColor, handleSelectColor } = props;

    return (
        <div className="mb-3 cursor-default flex gap-3 items-center">
            {color?.map((item, index) => {
                return (
                    <div
                        key={`product-color-${index}`}
                        className={`relative h-[31px] w-[31px] cursor-pointer rounded-full flex justify-center items-center ${selectColor?.code === item?.code ? 'border border-[#808284]' : ''}`}
                        onMouseEnter={() => handleChangeNameColor(item?.name)}
                        onClick={() => handleSelectColor(item)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div
                            className={` h-[23px] w-[23px] rounded-full ${item.invalid ? ' opacity-5' : ''}`}
                            style={{ backgroundColor: item?.code }}
                        ></div>
                        {item.invalid &&
                            (<div className=" absolute">
                                <IconClose />
                            </div>)
                        }
                    </div>
                )
            })}
        </div>
    );
};

export default ProductDetailColorPick;