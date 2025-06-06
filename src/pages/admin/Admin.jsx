import useWindowSize from "@hooks/useWindowSize";
import React from "react";

export const BackWrapper = ({handleGoBack, ...props}) => {
    return (
        <div
            className='w-fit flex items-center gap-3 text-sm font-bold opacity-80 p-1 hover:bg-[#f1f5f9] transition-colors duration-200 cursor-pointer'
            onClick={handleGoBack}
            {...props}
        />
    )
}

export const ContentWrapper = (props) => {
    return (
        <div
            className='w-full flex flex-col sm:flex-row'
            style={{
                height: 'calc(100vh - 68px)'
            }}
            {...props}
        />
    )
}

export const SildeBarWrapper = (props) => {
    return (
        <div
            className='h-[66px] sm:h-full w-full sm:w-[64px] md:w-[150px]'
            {...props}
        />
    )
}

export const SildeBarContentWrapper = (props) => {
    const iw = useWindowSize().width;

    return (
        <div
            className='flex gap-[3px]'
            style={{
                width: iw > 768 ? 'calc(100vw - 182px)' : iw > 640 ? 'calc(100vw - 96px)' : '100%',
                height: iw > 640 ? '100%' : 'calc(100% - 66px)'
            }}
            {...props}
        />
    )
}