import { axiosInstance } from "@api/api";
import { ADMIN, GET_DETAIL_VOUCHER_ADMIN, GET_VOUCHER_LIST_ADMIN, QL_VOUCHER } from "@constants/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd"


export const getVoucherList = async (type, status) => {
    const response = await axiosInstance.get(`/admin/getVouchers?type=${type}&status=${status}`, {
        requiresAuth: true,
    });

    return response.data;
}

export function useGetVoucherList(type, status, role) {
    return useQuery({
        queryFn: () => getVoucherList(type, status),
        queryKey: [GET_VOUCHER_LIST_ADMIN, type, status,],
        enabled: (role?.includes(ADMIN) || role?.includes(QL_VOUCHER)),
    })

}

export const getVoucherDetail = async (id) => {
    const response = await axiosInstance.get(`/admin/getDetail?id=${id}`, {
        requiresAuth: true,
    });

    return response.data;
}

export function useGetVoucherDetail(id) {
    return useQuery({
        queryFn: () => getVoucherDetail(id),
        queryKey: [GET_DETAIL_VOUCHER_ADMIN, id],
        enabled: !!id,
    })
}

export const createVoucher = async (body) => {
    const response = await axiosInstance.post(`/admin/createVoucher`, JSON.stringify(body), {
        requiresAuth: true,
    });

    return response.data;
}

export function useCreateVoucher() {
    return useMutation(
        {
            mutationFn: (body) => createVoucher(body),
        }
    )
}

export const updateVoucher = async (body) => {
    const response = await axiosInstance.post(`/admin/updateVoucher`, JSON.stringify(body), {
        requiresAuth: true,
    });

    return response.data;
}

export function useUpdateVoucher() {
    return useMutation(
        {
            mutationFn: (body) => updateVoucher(body),
        }
    )
}

export const deleteVoucher = async (body) => {
    const response = await axiosInstance.post(`/admin/deleteVoucher`, JSON.stringify(body), {
        requiresAuth: true,
    });

    return response.data;
}

export function useDeleteVoucher() {
    return useMutation(
        {
            mutationFn: (body) => deleteVoucher(body),
        }
    )
}

export const updateStatus = async (body) => {
    const response = await axiosInstance.post(`/admin/updateStatus`, JSON.stringify(body), {
        requiresAuth: true,
    });

    return response.data;
}

export function useUpdateStatus() {
    return useMutation(
        {
            mutationFn: (body) => updateStatus(body),
        }
    )
}