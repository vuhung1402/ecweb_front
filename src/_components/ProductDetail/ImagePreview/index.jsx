import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "antd";

import { BigImageWrapper, SmallImageWrapper } from "@pages/ProductDetail/ProductDetail";

import './style.scss';

const ImagePreview = ({ imageArray, currentImg }) => {
    const [imageId, setImageId] = useState();

    const carouselRef = useRef();

    const handleScroll = () => {
        const elements = document.querySelectorAll('div[id^="image-"]');
        const scrollPosition = window.scrollY;

        elements.forEach(element => {
            const imageTop = element.offsetTop;
            const imageBottom = imageTop + element.offsetHeight;

            if (scrollPosition >= imageTop && scrollPosition <= imageBottom) {
                const imageId = element.id;
                const index = imageId?.split('-')[1]
                if(imageId !== index){
                    setImageId(index)
                }
            }
        });
    };

    const handleNavigateImage = (id) => {
        const link = document.getElementById(id);
        if (link) link.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const watchScroll = () => {
            window.addEventListener("scroll", handleScroll);
        };
        watchScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!currentImg || !imageArray) return;

        const index = imageArray.findIndex(item => item?.uid === currentImg);
        if (index !== -1) {
            carouselRef.current.goTo(index);
            const targetElement = document.getElementById(`image-${index}`);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            };
        };
    },[currentImg]);

    return (
        <>
            <SmallImageWrapper>
                {
                    imageArray?.map((item, index) => {
                        return (
                            <a
                                onClick={() => handleNavigateImage(`image-${index}`)}
                                id={`small-image-${index}`}
                                key={`small-image-${index}`}
                                className={`w-[64px] h-[64px] cursor-pointer ${Number(imageId) === index ? 'border': ''}`}
                            >
                                <img alt="123s" src={item?.url} />
                            </a>
                        )
                    })
                }
            </SmallImageWrapper>
            <BigImageWrapper>
                {
                    imageArray?.map((item, index) => {
                        return (
                            <div
                                id={`image-${index}`}
                                key={`big-image-${index}`}
                                className="w-full"
                            >
                                <img alt="big-img" src={item?.url} className="w-full" />
                            </div>
                        )
                    })
                }
            </BigImageWrapper>
            <Carousel
                rootClassName="w-full slide-show block me:hidden"
                // dots={{className: 'text-black'}}
                ref={carouselRef}
                customPaging={(i) => {
                    console.log({ i });

                    return <img alt="img" key={`img-carousel-preview-${i}`} src={imageArray?.[i]?.url} className="w-full h-auto" />
                }}
            >
                {
                    imageArray?.map((item, index) => {
                        return (
                           <img alt="img" key={`img-carousel-${index}`} src={item?.url} className="w-full h-auto" />
                        )
                    })
                }
            </Carousel>
        </>
    )
}

export default ImagePreview