import React, { useEffect } from "react";

import "./style.scss";

const Sponsor = () => {
    useEffect(() => {
        const scrollers = document.querySelectorAll(".scroller");
        addAnimation();
        // if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        //     console.log("sponsor")
        //     addAnimation();
        // }

        function addAnimation() {
            scrollers.forEach((scroller) => {
                scroller.setAttribute("data-animated", true);

                const scrollerInner =
                    scroller.querySelector(".scroller__inner");
                const scrollerContent = Array.from(scrollerInner.children);

                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute("aria-hidden", true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            });
        }
    }, []);

    return (
        <div className="sponsor">
            <div className="scroller" data-speed="fast">
                <ul className="tag-list scroller__inner text-[30px] sm:text-[50px]">
                    <li>Manchester United</li>
                    <li>QH Shop</li>
                    <li>Barcelona</li>
                    <li>Chelsea</li>
                    <li>Real Madrid</li>
                    <li>Inter Miami</li>
                    <li>Al Nassr</li>
                </ul>
            </div>
        </div>
    );
};

export default Sponsor;
