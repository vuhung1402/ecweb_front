import React from "react";
import { Button } from "antd";

import MotionBox from "@component/MotionBox";
import { fadeIn } from "@utils/animation";

import CardProduct from "@component/CardProduct/CardProduct";

const HomeProduct = (props) => {

    const { products } = props;

    return (
        <div className="w-full p-10 flex justify-center flex-col items-center gap-7">
            <div className="text-[36px] font-bold text-center">Check out our new arrivals</div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 xl:gap-x-10">
                {products.map((item, index) => {
                    return (
                        <div key={item?.id}>
                            <MotionBox animation={fadeIn(0.3 + (0.2 * index))} className="relative">
                                <CardProduct data={item}/>
                            </MotionBox>
                        </div>
                    )
                })}
            </div>
            <MotionBox animation={fadeIn(0.5)}>
                <Button
                    className="uppercase font-medium"
                    type="primary"
                >
                    shop all product
                </Button>
            </MotionBox>
        </div>
    );
};

export default HomeProduct;