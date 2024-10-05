import { useQuery, useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@api/api";
import { message } from "antd";
import { GET_CARD } from "@constants/index";

const getCart = async () => {
    const response = await axiosInstance.get(`/cart/cart_show`, {
        requiresAuth: true, // require user token
    });
    return response.data;
};

export function useGetCart() {
    return useQuery({
        queryFn: () => getCart(),
        queryKey: [GET_CARD]
    });
};

const deleteItemCart = async (id) => {
    const body = { _id : id };

    // const response = await axiosInstance.post(`/cart/delete_items_in_cart`, JSON.stringify(body) , {
    //     requiresAuth: true, // require user token
    // });
    // return response.data;
};

export function useDeleteItemCart(id) {
    return useMutation({
        mutationFn: deleteItemCart(id)
    });
};

export const checkout = async (items) => {
    const body = { items }

    try {
        const response = await axiosInstance.post(`/cart/check_out`, JSON.stringify(body) , {
            requiresAuth: true, // require user token
        });
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    };
};

export const updateItemCart = async (id, quantity) => {

    const body = {
        _id: id,
        quantity,
    }

    try{
        const res = await axiosInstance.post(`/cart/update_items_in_cart`, JSON.stringify(body), {
            requiresAuth: true,
        })
        return res.data;
    } catch (error){
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    }
}