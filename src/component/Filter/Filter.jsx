import React, { useEffect, useState } from "react"

import { Menu } from 'antd'
import { endpoint } from '../../api/api';

function Filter({onClick}){

    const [category, setCategory] = useState([])

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
            if(json?.success){
                setCategory(json?.formattedData)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }, [])

    return(
        <div className='p-5'>
            <Menu
              onClick={onClick}
              className='!border-none font-medium text-[14px] tracking-widest uppercase select-none'
              items={category}
              mode='inline'
            />
        </div>
    )
}

export default Filter