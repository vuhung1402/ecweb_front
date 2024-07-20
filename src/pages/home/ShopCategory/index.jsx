import React from "react";

import { Button } from "antd";

import MotionBox from "@component/MotionBox";
import { fadeIn } from "@utils/animation";

import IconTshirt from '@icon/iconTshirt.svg';
import IconPant from '@icon/iconPant.svg';
import IconJacket from '@icon/iconJacket.svg';
import IconCap from '@icon/iconCap.svg';

const ShopCategory = () => {
    return (
        <div className="w-full px-20 py-5 relative flex flex-col gap-5">
            <div className="text-[36px] font-bold text-center">
                Shop by Category
            </div>
            <div className="flex justify-center flex-wrap gap-10 w-full">
                <MotionBox animation={fadeIn(0.5)}>
                    <div className="w-[300px] h-[300px] flex flex-col items-center justify-center hover:scale-105 transition-all duration-200 cursor-pointer">
                        <IconTshirt />
                        <Button>T-Shirt</Button>
                    </div>
                </MotionBox>
                <MotionBox animation={fadeIn(0.7)}>
                    <div className="w-[300px] h-[300px] flex flex-col items-center justify-center hover:scale-105 transition-all duration-200 cursor-pointer">
                        <IconJacket />
                        <Button>Jacket</Button>
                    </div>
                </MotionBox>
                <MotionBox animation={fadeIn(0.9)}>
                    <div className="w-[300px] h-[300px] flex flex-col items-center justify-center hover:scale-105 transition-all duration-200 cursor-pointer">
                        <IconPant />
                        <Button>Pant</Button>
                    </div>
                </MotionBox>
                <MotionBox animation={fadeIn(1.1)}>
                    <div className="w-[300px] h-[300px] flex flex-col items-center justify-center hover:scale-105 transition-all duration-200 cursor-pointer">
                        <IconCap />
                        <Button>Cap</Button>
                    </div>
                </MotionBox>
            </div>
            <div className=""></div>
        </div>
    );
};

export default ShopCategory;