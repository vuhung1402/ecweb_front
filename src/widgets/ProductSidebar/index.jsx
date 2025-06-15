import React from "react";

import { Menu } from 'antd';
import useWindowSize from "../../hooks/useWindowSize";

import './style.scss';

function ProductSidebar({ onClick, category }) {

    const iw = useWindowSize().width;

    const menuMode = iw > 1024 ? 'vertical' : 'horizontal';
    
    return (
        <div className='px-5 py-5 sm:py-0 category-menu w-full'>
            <Menu
                onClick={onClick}
                mode={menuMode}
                className='font-bold text-[14px] tracking-widest uppercase select-none bg-white !shadow-lg'
                items={category}
                multiple={false}
            />
        </div>
    );
};

export default ProductSidebar;