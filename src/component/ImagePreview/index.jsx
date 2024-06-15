import React, { useEffect, useRef, useState } from "react";

const ImagePreview = ({ imageArray }) => {
    const [imageId, setImageId] = useState()
    

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

    const handleNavigateImage = (href, id) => {
        const link = document.getElementById(id);
        link.addEventListener('click', function (e) {
            e.preventDefault();
            setImageId(id?.split('-')[2])
            const targetId = link.getAttribute("href").slice(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            };
        });

    }

    useEffect(() => {
        const watchScroll = () => {
            window.addEventListener("scroll", handleScroll);
        };
        watchScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flex gap-3 h-fit w-full">
            <div className="flex flex-col gap-3 sticky top-20 h-fit">
                {
                    imageArray?.map((item, index) => {
                        const imageHref = `#image-${index}`
                        return (
                            <a onClick={() => handleNavigateImage(imageHref, `small-image-${index}`)} href={imageHref} id={`small-image-${index}`} className={`w-[64px] h-[64px] cursor-pointer ${Number(imageId) === index ? 'border': ''}`}><img src={item?.url} /></a>
                        )
                    })
                }
            </div>
            <div className="flex flex-col gap-3 flex-grow px-6">
                {
                    imageArray?.map((item, index) => {
                        return (
                            <div id={`image-${index}`} className="w-full"><img src={item?.url} className="w-full" /></div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ImagePreview