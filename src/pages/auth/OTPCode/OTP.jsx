import React from "react";

export const ContentWrapper = (props) => {
    return(
        <div className="flex flex-col items-center gap-3 w" {...props} />
    )
}

export const OTPInputWrapper = (props) => {
    return(
        <div className="w-full flex flex-col items-center" {...props} />
    )
}

export const ActionWrapper = (props) => {
    return(
        <div className="w-[252px] flex flex-col gap-3" {...props} />
    )
}
