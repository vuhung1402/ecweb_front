import { axiosInstance } from "@api/api";
import { useMutation } from "@tanstack/react-query";

const resetPassword = async (body) => {
    const response = await axiosInstance.post(`/users/${body?.user_id}/resetPass/`, JSON.stringify(body));
    return response.data;
}

export function useResetPassword() {
    return useMutation({
        mutationFn: (body) => resetPassword(body),
    })
} 