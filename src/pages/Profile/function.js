import { axiosInstance } from "@api/api";
import { GET_USER_PROFILE } from "@constants/index";
import { useQuery } from "@tanstack/react-query";
import { message } from "antd";

export const getProfileInfo = async () => {
    try {
        const response = await axiosInstance.get(`/users/get_info`, {
            requiresAuth: true,
        });
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.log("error: ", error);
    };
};

export function useGetProfileInfo () {
    return useQuery({
        queryFn: () => getProfileInfo(),
        queryKey: [GET_USER_PROFILE],
    });
}