import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";

import { endpoint, axiosInstance } from "@api/api";
import { GET_CATEGORIES, GET_PRODUCTS_PAGE, GET_QUANTITY_CARD } from "@constants/index";

export const addToCart = async (body) => {
    // const token = localStorage.getItem("token");
    // const response = await fetch(`${endpoint}/cart/add_to_cart`, {
    //     method: 'POST',
    //     body: JSON.stringify(body),
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'token': token,
    //     }
    // });
    // if (!response.ok) {
    //     message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    //     throw new Error('Network response was not ok');
    // }
    // const data = await response.json();
    // return data;

    const response = await axiosInstance.post(`/cart/add_to_cart`,
        body,
        {
            requiresAuth: true,
        },
    );

    return response.data
}

export const useAddToCart = () => {
    return useMutation({
        mutationFn: (body) => addToCart(body)
    })
}

// get quantity cart
export const quantityCart = async () => {
    const response = await axiosInstance.get(`/cart/show_number_items_in_cart`, {
        requiresAuth: true,
    })

    return response.data
}

export function useGetQuantityCart() {
    return useQuery({
        queryFn: () => quantityCart(),
        queryKey: [GET_QUANTITY_CARD],
        enabled: true,
    })
}

// products

const getProducts = async (location) => {
    const regex = /[?&]sort_by=([^&]*)/;
    const match = regex.exec(location?.search);
    const key = location?.state?.key ? location?.state?.key : 'all';
    const modeFilter = match?.[1].length > 0 ? `${location?.state?.value}` : `1`;

    const response = await axiosInstance.get(`/product/getAllProductList/${key}/${modeFilter}?name=${location?.name}`);
    return response.data;
};

export function useGetProducts(location, parmas, name) {
    let customLocation;
    if (location?.state?.key) {
        customLocation = {
            ...location,
            name: name,
        };
    } else {
        customLocation = {
            ...location,
            name: name,
            search: location?.search ? location?.search : `?sort_by=tang-dan`,
            state: {
                key: parmas?.category,
                value: location?.state?.value ? location?.state?.value : '1'
            }
        }
    }

    return useQuery({
        queryFn: () => getProducts(customLocation),
        queryKey: [GET_PRODUCTS_PAGE, location?.search, parmas?.category, name]
    });
};

export const getRelatedProducts = async (key) => {
    const response = await axiosInstance.get(`/product/getAllProductList/${key}/1`)

    return response?.data
}

export function useGetRelatedProducts(key) {
    return useQuery({
        queryFn: () => getRelatedProducts(key),
        queryKey: [...GET_PRODUCTS_PAGE, 'get_related_products']
    })
}

// catagories

export const getCategories = async () => {
    const response = await axiosInstance.get(`/category/getAllCategories`);
    return response.data;
};

export function useGetCategories() {
    return useQuery({
        queryFn: () => getCategories(),
        queryKey: [GET_CATEGORIES]
    });
};

export const findProductByImage = async (body) => {
    const response = await axiosInstance.post(`https://supposedly-massive-antelope.ngrok-free.app/find_similar`, JSON.stringify(body), {
        AI: true
    });
    return response.data;
};

export function useFindProductByImage() {
    return useMutation(
        {
            mutationFn: (body) => findProductByImage(body),
        }
    )
};
