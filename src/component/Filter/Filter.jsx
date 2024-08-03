import React, { useEffect, useState } from "react"

import { Menu } from 'antd'
import { endpoint } from '../../api/api';
import useWindowSize from "../../hooks/useWindowSize";

import './style.scss';

function Filter({ onClick }) {

    const [category, setCategory] = useState([]);

    const iw = useWindowSize().width;

    useEffect(() => {
        fetch(`${endpoint}/category/getAllCategories`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            if (json?.success) {
                setCategory(json?.formattedData)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }, []);

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
    )
}

export default Filter