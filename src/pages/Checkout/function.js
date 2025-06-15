import { axiosInstance } from "@api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GET_ADDRESS_INFO, GET_RELEASED_VOUCHER } from "@constants/index";

export const getAddressInfo = async () => {
    const response = await axiosInstance.get(`/users/get_address`, {
        requiresAuth: true,
    });
    return response.data;
};

export const createOrder = async (body) => {
    const response = await axiosInstance.post(`/order/add_order`, JSON.stringify(body), {
        requiresAuth: true,
    });
    return response.data;
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
    const response = await axiosInstance.get(`/voucher/getReleasedVouchers`, 
        {
            requiresAuth: true,
        }
    );

    return response.data;
}

export function useGetReleasedVoucher() {
    return useQuery({
        queryFn: () => getReleasedVoucher(),
        queryKey: [GET_RELEASED_VOUCHER],
    })
}

export const applyVoucher = async (body) => {
    const response = await axiosInstance.post(`/voucher/applyVoucher`, JSON.stringify(body), {
        requiresAuth: true,
    });
    return response.data;
}

export function useApplyVoucher() {
    return useMutation({
        mutationFn: (body) => applyVoucher(body)
    })
}