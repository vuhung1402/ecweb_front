import React from "react";

import { Menu } from 'antd';
import useWindowSize from "../../hooks/useWindowSize";

import './style.scss';

function Filter({ onClick, category }) {

    const iw = useWindowSize().width;

    const menuMode = iw > 1024 ? 'vertical' : 'horizontal';
    
    return (
        <div className='p-5 category-menu w-full'>
            <Menu
                onClick={onClick}
                mode={menuMode}
                className='!border-none font-bold text-[14px] tracking-widest uppercase select-none bg-[#f5f5f5]'
                items={category}
                multiple={false}
            />
        </div>
    );
};

export default Filter;