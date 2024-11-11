import React from "react";

export const PageTitleWrapper = (props) => {
    return (
        <div
            className="w-full me:w-1/2 h-auto px-[15px] py-[30px] md:px-0 md:py-0 md:h-full flex justify-center items-center font-semibold text-5xl"
            style={{
                borderRight: '1px solid rgba(5, 5, 5, 0.06)'
            }}
            {...props}
        />
    )
}

export const PageWrapper = (props) => {
    return (
        <div
            className="w-full py-[60px] px-[15px] me:w-1/2 md:py-[100px] md:px-[80px] me:py-[100px] me:px-[60px] xl:p-[100px]"
            {...props}
        />
    )
}