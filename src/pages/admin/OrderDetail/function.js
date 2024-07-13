import { endpoint } from "@api/api";
import { message } from "antd";

export const getOrderDetail = async (id) => {
    const token = localStorage.getItem("token");
    const body = {
        Order_id: id,
    };
    try {
        const response = await fetch(`${endpoint}/order/get_order_detail`, {
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