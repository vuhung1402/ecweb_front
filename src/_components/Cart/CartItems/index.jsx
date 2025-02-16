import React from "react";
import { SwapRightOutlined } from "@ant-design/icons";

import { changeSizeRule } from "@constants/index";

const CartItems = (props) => {

    const { data } = props;

    return (
        <div className="w-full md:w-2/3 flex flex-col gap-3">
            {data?.items?.length === 0 && <div>Giỏ hàng của bạn đang trống</div>}
            {props.children}
            <div className="font-bold opacity-60 w-fit flex flex-col gap-2 justify-end uppercase text-base">
                <div className="">Chính sách đổi size</div>
                <div className="flex flex-col gap-1">
                    {changeSizeRule.map((item, index) => {
                        return (
                            <div
                                className="text-xs opacity-70 flex items-center gap-2"
                                key={`change-size-rule-${index}`}
                            >
                                <SwapRightOutlined />
                                {item}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default CartItems;