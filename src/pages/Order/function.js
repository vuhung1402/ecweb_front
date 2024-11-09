import { axiosInstance } from "@api/api";
import { GET_ORDER_LIST } from "@constants/index";
import { useQuery } from "@tanstack/react-query";
import { message } from "antd";

export const getOrderList = async (query) => {
    try {
        const response = await axiosInstance.get(`/order/get_list_detail_user${query}`, {
            requiresAuth: true,
        })

        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useGetOrderList (query) {
    return useQuery({
        queryFn: () => getOrderList(query),
        queryKey: [GET_ORDER_LIST, query],
    })
}
