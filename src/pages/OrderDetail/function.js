import { axiosInstance, endpoint } from "@api/api";
import { message } from "antd";

export const getOrderDetail = async (id) => {
    const body = {
        Order_id: id, 
    };
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${endpoint}/order/get_order_detail`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "token": token,
                'Content-Type': 'application/json',
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

export const cancelOrder = async (Order_id) => {
    const body = {
        Order_id
    }
    try {
        const response = await axiosInstance.post(`order/cancer_order`, JSON.stringify(body), {
            requiresAuth: true,
        });
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    }
}

export const orderHistory = async (Order_id) => {
    const body = {
        Order_id
    }

    try {
        const response = await axiosInstance.post(`order/get_OrderHistory_log`, JSON.stringify(body), {
            requiresAuth: true,
        });
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    }
}