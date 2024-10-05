import React from "react";
import { useDispatch } from "react-redux";
import { numOfCartPackage } from "@redux/actions";

import { useGetQuantityCart } from "@pages/Product/function";
import { TOKEN_INVALID } from "@utils/error";

const useGetCartQuantity = () => {

    const dispatch = useDispatch()

    const { data, refetch } = useGetQuantityCart()

    if (data) {
        if (data?.message === TOKEN_INVALID) {
            dispatch(numOfCartPackage(0))
        } else {
            dispatch(numOfCartPackage(data))
        }
    }

    const getQuantity = () => { refetch() }

    return { getQuantity, cartQuantity: data }
}

export default useGetCartQuantity;