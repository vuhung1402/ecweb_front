import React from "react";

const ProductDetailSize = (props) => {

    const { sizes, selectSize } = props;
    const { handleSelectSize } = props;

    return (
        <div className="flex flex-col gap-3 pb-3 border-b">
            <div className="text-sm font-medium text-gray-900">Kiích thước</div>

            <div className="flex gap-3 pb-3 items-center">
                {sizes?.map((item, index) => {
                    return (
                        <div
                            onClick={() => handleSelectSize(item)}
                            className={` relative w-[40px] h-[40px] text-center border flex items-center justify-center 
                                    ${item?.name_size === selectSize?.name_size ? 'bg-black text-white' : 'text-black'} ${item?.invalid ? ' cursor-default' : ' cursor-pointer'}`}
                            key={`product-size-${index}`}
                        >
                            <div className={`text-[16px] ${item?.invalid ? ' opacity-30' : ''}`}>{item?.name_size}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ProductDetailSize;