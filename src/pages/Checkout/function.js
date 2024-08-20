import { axiosInstance } from "@api/api";
import { message } from "antd";

export const getAddressInfo = async () => {
    try {
        const response = await axiosInstance.get(`/users/get_address`, {
            requiresAuth: true,
        });
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    };
};

export const order = async (body) => {
    try {
        const response = await axiosInstance.post(`/order/add_order`, JSON.stringify(body), {
            requiresAuth: true,
        });
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    };
};