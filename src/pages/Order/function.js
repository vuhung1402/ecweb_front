import { axiosInstance } from "@api/api";
import { GET_ORDER_LIST } from "@constants/index";
import { useQuery } from "@tanstack/react-query";

export const getOrderList = async (query) => {
    const response = await axiosInstance.get(`/order/get_list_detail_user${query}`, {
        requiresAuth: true,
    })

    return response.data;
}

export function useGetOrderList(query) {
    return useQuery({
        queryFn: () => getOrderList(query),
        queryKey: [GET_ORDER_LIST, query],
    })
}
