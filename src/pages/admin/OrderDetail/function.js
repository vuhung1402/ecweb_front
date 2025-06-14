import { axiosInstance, endpoint } from "@api/api";
import { GET_ORDER_DETAIL_ADMIN } from "@constants/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";

//get order detail
export const getOrderDetail = async (Order_id, user_id) => {
    const body = {
        Order_id,
        user_id
    }
    const response = await axiosInstance.post(`/admin/get_order_detail_to_admin`, JSON.stringify(body),
        {
            requiresAuth: true,
        }
    )

    return response.data;
};

export function useGetOrderDetail(Order_id, user_id) {
    return useQuery(
        {
            queryFn: () => getOrderDetail(Order_id, user_id),
            queryKey: [GET_ORDER_DETAIL_ADMIN, Order_id, user_id],
            enabled: !!Order_id && !!user_id,
        }
    )
}

export const updateStatuOrder = async (body) => {
    // const body = {
    //     Order_id,
    //     user_id,
    //     new_status_order,
    // }

    const response = await axiosInstance.post(`/admin/update_status_order`, JSON.stringify(body), {
        requiresAuth: true,
    });
    return response.data
}

export function useUpdateStatusOrder() {
    return useMutation(
        {
            mutationFn: (body) => updateStatuOrder(body),
        }
    )
}

export const refundMoney = async (body) => {

    const response = await axiosInstance.post(`admin/refund_momo_money_admin`, JSON.stringify(body), {
        requiresAuth: true,
    });
    return response.data;
}

export function useRefundMoney() {
    return useMutation(
        {
            mutationFn: (body) => refundMoney(body),
        }
    );
}