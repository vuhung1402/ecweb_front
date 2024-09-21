import React, { useState, useEffect } from "react";

const useVisibleHeader = () => {
    const [position, setPosition] = useState(window.scrollY)
    const [visible, setVisisble] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            let moving = window.scrollY;
            setPosition(moving)
            setVisisble(moving < 60 ? false : position > moving)
        };

        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    });

    return { position, visible }
};

export default useVisibleHeader;