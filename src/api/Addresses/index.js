import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@api/api";
import { message } from "antd";

export const insertAddress = async (body) => {
    try {
        const response = await axiosInstance.post(`/users/insert_address/`, 
            body,
            {
                requiresAuth: true,
            },
        );
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    };
};

export const updateAddress = async (body, addressId) => {
    try {
        const response = await axiosInstance.post(`/users/update_address/${addressId}/`, 
            body,
            {
                requiresAuth: true,
            },
        );
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    };
};

export const deleteAdress = async (addressId) => {
    try {
        const res = await axiosInstance.post(`users/delete_address/${addressId}`, {}, {
            requiresAuth: true
        })

        return res.data
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    }
}

export const useInsertAddress = () => {
    return useMutation({
        mutationFn: (body) => insertAddress(body)
    })
}

export const useUpdateAddress = () => {
    return useMutation({
        mutationFn: ({body, addressId}) => updateAddress(body, addressId)
    })
}

export const useDeleteAdress = () => {
    return useMutation({
        mutationFn: (addressId) => deleteAdress(addressId)
    })
}