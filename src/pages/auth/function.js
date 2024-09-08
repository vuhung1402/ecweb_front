import { axiosInstance } from "@api/api";
import { message } from "antd";

export const login = async (body) => {
    try {
        const response = await axiosInstance.post(`/auth/`, JSON.stringify(body));
        return response;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    }
}

export const verifyOtp = async (body, user_id) => {
    try {
        const response = await axiosInstance.post(`/users/${user_id}/verify/`, JSON.stringify(body));
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    }
}

export const verifyOtpForgotPass = async (body, user_id) => {
    try {
        const response = await axiosInstance.post(`/users/${user_id}/verify-otp-resetpassword/`, JSON.stringify(body));
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    }
}

export const forgotPass = async (body) => {
    try {
        const response = await axiosInstance.post(`/users/forgot-password/`, JSON.stringify(body));
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    }
}

export const resetPassword = async (body, user_id) => {
    try{
        const response = await axiosInstance.post(`/users/${user_id}/resetPass/`, JSON.stringify(body));
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    }
}