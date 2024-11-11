import { axiosInstance } from "@api/api";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

export const login = async (body) => {
    const response = await axiosInstance.post(`/auth/`, JSON.stringify(body))
    return response.data;
}

export function useLogin () {
    return useMutation({
        mutationFn: (body) => login(body), 
    })
}