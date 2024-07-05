import { endpoint } from "@api/api";
import { message } from "antd";

export const getCart = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${endpoint}/cart/cart_show`, {
            method: 'GET',
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

export const getOrderList = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${endpoint}/order/get_list_detail_user`, {
            method: 'GET',
            // body: JSON.stringify(body),
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