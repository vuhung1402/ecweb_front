import { axiosInstance } from "@api/api";
import { message } from "antd";

export const getProfileInfo = async () => {
    try {
        const response = await axiosInstance.get(`/users/get_info`, {
            requiresAuth: true,
        });
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    };
};