import { axiosInstance, endpoint } from "@api/api";
import { GET_ORDER_LIST_ADMIN } from "@constants/index";
import { useQuery } from "@tanstack/react-query";
import { message } from "antd";

export const getOrderList = async (query) => {
    try {
        const response = await axiosInstance.get(`/admin/get_full_order_table${query}`, 
            {
                requiresAuth: true,
            }
        )
        return response.data
    } catch (error) {
        console.log("An error occur when get orderlist: ", error);
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    }
}

export function useGetOrderList (query) {
    return useQuery({
        queryFn: () => getOrderList(query),
        queryKey:[GET_ORDER_LIST_ADMIN, query],
    })
}