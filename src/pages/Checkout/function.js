import { axiosInstance } from "@api/api";
import { message } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GET_ADDRESS_INFO, GET_RELEASED_VOUCHER } from "@constants/index";

export const getAddressInfo = async () => {
    try {
        const response = await axiosInstance.get(`/users/get_address`, {
            requiresAuth: true,
        });
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    };
};

export const createOrder = async (body) => {
    try {
        const response = await axiosInstance.post(`/order/add_order`, JSON.stringify(body), {
            requiresAuth: true,
        });
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    };
};

export function useCreateOrder() {
    return useMutation({
        mutationFn: (body) => createOrder(body)
    })
}

export function useGetAddressInfo() {
    return useQuery({
        queryFn: () => getAddressInfo(),
        queryKey: [GET_ADDRESS_INFO],
    })
}

export const getReleasedVoucher = async () => {
    try {
        const response = await axiosInstance.get(`/voucher/getReleasedVouchers`);

        return response.data;
    } catch {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useGetReleasedVoucher() {
    return useQuery({
        queryFn: () => getReleasedVoucher(),
        queryKey: [GET_RELEASED_VOUCHER],
    })
}

export const applyVoucher = async (body) => {
    try {
        const response = await axiosInstance.post(`/voucher/applyVoucher`, JSON.stringify(body), {
            requiresAuth: true,
        });
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useApplyVoucher() {
    return useMutation({
        mutationFn: (body) => applyVoucher(body)
    })
}