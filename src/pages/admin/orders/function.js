import { endpoint } from "@api/api";
import { message } from "antd";

export const getOrderList = async (query) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${endpoint}/admin/get_full_order_table${query}`, {
            method: 'POST',
            headers: {
                "token" : `${token}`,
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

export const updateStatuOrder = async (user_id, Order_id, new_status_order) => {
    const body = {
        Order_id,
        user_id,
        new_status_order,
    }

    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${endpoint}/admin/update_status_order`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "token" : `${token}`,
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