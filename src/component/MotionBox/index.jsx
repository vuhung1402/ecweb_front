import React from "react";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const MotionBox = ({
    children,
    animation,
    className = "",
}) => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [inView, controls]);

    return (
        <div ref={ref} className={`${className} relative`}>
            <motion.div
                initial="hidden"
                animate={controls}
                exit="hidden"
                variants={animation}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default MotionBox;
