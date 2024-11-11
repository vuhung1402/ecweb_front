import { axiosInstance } from "@api/api";
import { useMutation } from "@tanstack/react-query";

const forgotPass = async (body) => {
    const response = await axiosInstance.post(`/users/forgot-password/`, JSON.stringify(body));
    return response.data;
}

export function useForgotPass() {
    return useMutation({
        mutationFn: (body) => forgotPass(body),
    })
}