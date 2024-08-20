import { endpoint, axiosInstance } from "@api/api";
import { message } from "antd";

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

export const getProducts = async (key, modeFilter) => {
    try {
        const response = await axiosInstance.get(`/product/getAllProductList/${key}/${modeFilter}`);
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    }
};

export const getCategories = async () => {
    try {
        const response = await axiosInstance.get(`/category/getAllCategories`);
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    }
};