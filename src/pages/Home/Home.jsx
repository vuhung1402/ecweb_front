import React from "react";

import HomePageImage from '@images/homepage.png';

export const HomeHeader = (props) => {
    return (
        <div
            className="flex top-0 fixed w-full justify-center z-[999]"
            {...props}
        >
            {props.children}
        </div>
    );
};

export const HomeBackground = (props) => {
    return (
        <div
            className="w-full h-full relative"
            style={{
                backgroundImage: `url(${HomePageImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {props.children}
        </div>
    )
};

export const HomePart = (props) => {
    return (
        <div className="w-full" {...props}>
            {props.children}
        </div>
    );
};