import React from "react";
import Loading from "@widgets/Loading/Loading";

const CartContainer = (props) => {

    if (props.isLoading) return <div className="w-full h-full"><Loading /></div>

    return (
        <div className="w-full h-full xl:max-w-[1600px] px-[15px] xl:px-[85px] mx-auto">
            {props.children}
        </div>
    );
};

export default CartContainer;