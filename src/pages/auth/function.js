import { axiosInstance } from "@api/api";
import { useMutation } from "@tanstack/react-query";

export const verifyOtp = async (body) => {
    const response = await axiosInstance.post(`/users/${body?.user_id}/verify/`, JSON.stringify(body));
    return response.data;
}

export function useVerifyOtp () {
    return useMutation({
        mutationFn: (body) => verifyOtp(body),
    })
}

export const verifyOtpForgotPass = async (body) => {
    const response = await axiosInstance.post(`/users/${body?.user_id}/verify-otp-resetpassword/`, JSON.stringify(body));
    return response.data;
}

export function useVerifyOtpForgotPass () {
    return useMutation({
        mutationFn: (body) => verifyOtpForgotPass(body)
    })
}