import { axiosInstance } from "@api/api"
import { useMutation } from "@tanstack/react-query";

export const resendPass = async (body) => {
    const res = await axiosInstance.post(`/users/resend-otp`, JSON.stringify(body));
    return res.data;
}

export function useResendPass () {
    return useMutation({
        mutationFn: (body) => resendPass(body),
    })
}