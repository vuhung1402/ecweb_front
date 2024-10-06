import React from "react";

const CartHeader = (props) => {
    return (
        <div className="w-full flex flex-col items-center justify-center font-semibold text-5xl gap-2 p-5">
            <div className="font-semibold text-3xl text-center">Giỏ hàng của bạn</div>
            <div className="font-semibold text-sm text-center opacity-60">{`Có ${props.quantity} sản phẩm trong giỏ hàng`}</div>
            <span className="bg-black p-[1.5px] w-14"></span>
        </div>
    );
};

export default CartHeader;