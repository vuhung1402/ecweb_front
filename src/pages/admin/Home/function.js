import { axiosInstance } from "@api/api";
import { ADMIN, GET_ADMIN_REVENEU_STATISTICAL, GET_ADMIN_STATISTICAL } from "@constants/index";
import { useQuery } from "@tanstack/react-query";
import { message } from "antd";

export const getStatistical = async () => {
    try {
        const response = await axiosInstance.get(`/admin/statistical`, {
            requiresAuth: true,
        });
        return response.data
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useGetStatistical(role) {
    return useQuery(
        {
            queryFn: getStatistical,
            queryKey: [GET_ADMIN_STATISTICAL],
            enabled: role?.includes(ADMIN),
        }
    )
}

export const getReveneuStatistical = async (year) => {
    try {
        const response = await axiosInstance.get(`/admin/revenueStatistics?year=${year}`, {
            requiresAuth: true,
        });
        return response.data
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useGetReveneuStatistical(year, role) {
    return useQuery(
        {
            queryFn: () => getReveneuStatistical(year),
            queryKey: [GET_ADMIN_REVENEU_STATISTICAL, year],
            enabled: role?.includes(ADMIN),
        }
    )
}