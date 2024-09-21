import React from "react";
import { Button } from "antd";

import MotionBox from "@component/MotionBox";

import { fadeIn } from "@utils/animation";

import IconArrowDown from '@icon/iconArrowDown.svg';

const HomeBG = (props) => {

    const { handleCLick, handleScrollToProduct } = props;

    return (
        <div className="uppercase text-[42px] font-bold absolute top-0 left-0 w-full h-full p-8 flex flex-col items-center justify-end">
            <MotionBox animation={fadeIn(0.5)}>
                <p className="text-white text-center">new collection out now!</p>
            </MotionBox>
            <MotionBox animation={fadeIn(1)}>
                <Button onClick={handleCLick} className="uppercase font-bold mt-8 !px-[30px] !py-[20px] flex items-center text-[15px]">
                    shop now
                </Button>
            </MotionBox>
            <MotionBox animation={fadeIn(1.5)}>
                <IconArrowDown
                    className="mt-[60px] text-white cursor-pointer"
                    onClick={handleScrollToProduct}
                />
            </MotionBox>
        </div>
    );
};

export default HomeBG;