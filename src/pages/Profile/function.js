import { axiosInstance } from "@api/api";
import { GET_USER_PROFILE } from "@constants/index";
import { useQuery } from "@tanstack/react-query";
import { message } from "antd";

export const getProfileInfo = async () => {
    const response = await axiosInstance.get(`/users/get_info`, {
        requiresAuth: true,
    });
    return response.data;
};

export function useGetProfileInfo() {
    return useQuery({
        queryFn: () => getProfileInfo(),
        queryKey: [GET_USER_PROFILE],
    });
}