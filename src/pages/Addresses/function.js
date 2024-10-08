import { axiosInstance } from "@api/api";
import { message } from "antd";

export const insertAddress = async (body) => {
    try {
        const response = await axiosInstance.post(`/users/insert_address/`, 
            body,
            {
                requiresAuth: true,
            },
        );
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    };
};

export const updateAddress = async (body, addressId) => {
    try {
        const response = await axiosInstance.post(`/users/update_address/${addressId}/`, 
            body,
            {
                requiresAuth: true,
            },
        );
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    };
};