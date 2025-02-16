import { axiosInstance } from "@api/api"
import { useMutation } from "@tanstack/react-query";

const register = async (body) => {
    const response = await axiosInstance.post(`/users/`, JSON.stringify(body), {
        requiresAuth: true,
    })

    return response?.data;
}

export function useRegister () {
    return useMutation({
        mutationFn: (body) => register(body),
    })
}
