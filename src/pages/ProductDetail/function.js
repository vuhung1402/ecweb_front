import { useQuery } from "@tanstack/react-query";
import { message } from "antd";

import { endpoint, axiosInstance } from "@api/api";
import { GET_DETAIL_PRODUCT } from "@constants/index";

const getDetailProduct = async (id) => {
    const response = await axiosInstance.get(`/product/getProductDetail/${id}`);
    return response.data;
};

export function useGetDetailProduct(id) {
    return useQuery({
        queryFn: () => getDetailProduct(id),
        queryKey: [GET_DETAIL_PRODUCT]
    });
};

export const addToCart = async (body) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${endpoint}/cart/add_to_cart`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        });
        if (!response.ok) {
            message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export const quantityCart = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${endpoint}/cart/show_number_items_in_cart`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            }
        });
        if (!response.ok) {
            message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}