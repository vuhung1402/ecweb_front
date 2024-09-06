import { endpoint, axiosInstance } from "@api/api";
import { message } from "antd";

export const getCart = async () => {
    try {
        const response = await axiosInstance.get(`/cart/cart_show`, {
            requiresAuth: true, // require user token
        });
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    };
};

export const deleteItemCart = async (id) => {
    const body = { _id : id };

    try {
        const response = await axiosInstance.post(`/cart/delete_items_in_cart`, JSON.stringify(body) , {
            requiresAuth: true, // require user token
        });
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    };
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