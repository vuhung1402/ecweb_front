import { useQuery, useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@api/api";
import { GET_CARD } from "@constants/index";
import { message } from "antd";

// get cart items
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

// delete item in cart
const deleteItemCart = async (id) => {
    if (!id) return
    const body = { _id : id };

    const response = await axiosInstance.post(`/cart/delete_items_in_cart`, JSON.stringify(body) , {
        requiresAuth: true, // require user token
    });
    return response.data;
};

export function useDeleteItemCart() {
    return useMutation({
        mutationFn:(id) => deleteItemCart(id)
    });
};

// checkout
export const checkout = async (items) => {
    const body = { items }

    try {
        const response = await axiosInstance.post(`/cart/check_out`, JSON.stringify(body) , {
            requiresAuth: true, // require user token
        });
        return response.data;
    } catch (error) {
        message.error(error?.response?.data?.message);
    }
};

export function useCheckout() {
    return useMutation({
        mutationFn: (item) => checkout(item),
    })
};

// update item in cart
export const updateItemCart = async (data) => {
    const body = {
        _id: data?.id,
        quantity: data?.quantity,
    }

    const res = await axiosInstance.post(`/cart/update_items_in_cart`, JSON.stringify(body), {
        requiresAuth: true,
    })

    return res.data;
}

export function useUpdateItemCart() {
    return useMutation({
        mutationFn: (data) => updateItemCart(data) 
    })
}