import React, { useEffect, useRef, useState } from "react";

const ImagePreview = ({imageArray}) => {
    console.log(imageArray)

    const [state, setState] = useState({
        imageIndex: 0,
    })

    const sectionRef = useRef(null)

    const handleScroll = (e, index) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const scrollRatio = scrollTop / (scrollHeight - clientHeight);

        if (scrollRatio < 0.5) {
            setState((prev) => ({...prev, imageIndex: index}))
        } 
        // else {
        //     setBackgroundColor("white");
        // }
    }

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight } = sectionRef.current;
            const paragraphs = sectionRef.current.querySelectorAll("div");

            paragraphs.forEach((paragraph) => {
                const paragraphTop = paragraph.offsetTop - sectionRef.current.offsetTop;

                if (scrollTop >= paragraphTop && scrollTop <= paragraphTop + clientHeight) {
                    console.log(paragraph.textContent);
                }
            });
        };

        sectionRef.current.addEventListener("scroll", handleScroll);
        return () => {
            sectionRef.current.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return(
        <div className=" flex gap-3 h-fit">
            <div className=" flex flex-col gap-3 sticky top-20 h-fit">
                {
                    imageArray?.map((item, index) => {
                        return(
                            <div className={`w-[64px] h-[64px] ${state.imageIndex === index ? " border-black" : "border"}`}><img src={item} /></div>
                        )
                    })
                }
            </div>
            <div className=" flex flex-col gap-3">
                {
                    imageArray?.map((item, index) => {
                        return(
                            <div ref={sectionRef} onScroll={(e) => handleScroll(e, index)} className=" w-[635px] h-[635px]"><img src={item} /></div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ImagePreview