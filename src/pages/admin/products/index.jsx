import TabCategory from "@component/Tabs";
import React, { useEffect, useState } from "react";

const Products = ({url}) => {
    const data = [
        {
            "name": "Áo",
            "route": "xem-tat-ca-ao",
            "category_id": "a",
        },
        {
            "name": "Quần",
            "route": "xem-tat-ca-ao",
            "category_id": "q",
        }
    ]

    // const [state, setState] = useState({
    //     isModalOpen: false,
    //     isModalDeleteOpen: false,
    //     data: [],
    //     activeKey: data?.[0]?.category_id, 
    // });

    useEffect(() => {
        //goi ham de get data
        // state.data = getCategories(url)
        // setState((prev) => ({...prev}))
    },[])

    return (
        <div className=" w-full h-full">
            <TabCategory data = {data} />
        </div>
    )
}

export default Products