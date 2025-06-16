import React from "react";
import useWindowSize from "@hooks/useWindowSize";


export const UserFilterWrapper = (props) => {
    return(
        <div className="w-full flex justify-end items-center gap-3" {...props}></div>
    );
}

export const UserListWrapper = (props) => {
    const iw = useWindowSize().width;

    return (
        <div
            style={{
                height: iw > 640 ? 'calc(100vh - 120px)' : 'calc(100vh - 230px)'
            }}
            {...props}
        >

        </div>
    )
}