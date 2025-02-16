import { axiosInstance } from "@api/api";
import { GET_ORDER_DETAIL, GET_ORDER_HISTORY } from "@constants/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";

export const getOrderDetail = async (id) => {
    const body = {
        Order_id: id, 
    };

    try {
        const response = await axiosInstance.post(`/order/get_order_detail`, JSON.stringify(body),{
            requiresAuth: true,
        })
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useGetOrderDetail (id) {
    return useQuery({
        queryFn: () => getOrderDetail(id),
        queryKey: [GET_ORDER_DETAIL, id],
        enabled: !!id
    })
}

export const cancelOrder = async (body) => {
    try {
        const response = await axiosInstance.post(`order/cancer_order`, JSON.stringify(body), {
            requiresAuth: true,
        });
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    }
}

export function useCancelOrder () {
    return useMutation({
        mutationFn: (body) => cancelOrder(body),
    })
}

export const refundMoney = async (body) => {

    try {
        const response = await axiosInstance.post(`order/refund_momo_money`, JSON.stringify(body), {
            requiresAuth: true,
        });
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    }
}

export function useRefundMoney () {
    return useMutation(
        {
            mutationFn: (body) => refundMoney(body),
        }
    );
}

export const orderHistory = async (Order_id) => {
    const body = {
        Order_id
    }

    try {
        const response = await axiosInstance.post(`order/get_OrderHistory_log`, JSON.stringify(body), {
            requiresAuth: true,
        });
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    }
}

export function useGetOrderHistory (Order_id) {
    return useQuery({
        queryFn: () => orderHistory(Order_id),
        queryKey: [GET_ORDER_HISTORY, Order_id],
        enabled:!!Order_id
    })
}

export const requestReturnOrder = async(body) => {
    try{
        const response = await axiosInstance.post(`order/add_description_fop_refund`, JSON.stringify(body), {
            requiresAuth: true,
        });
        return response.data;
    }catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    }
}

export function useRequestReturnOrder () {
    return useMutation(
        {
            mutationFn: (body) => requestReturnOrder(body),
        }
    );
}