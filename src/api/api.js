import axios from 'axios';

export const endpoint = "https://ecweb-backend.onrender.com/api/v1"

export const status = {
    "to-pay": "Chờ thanh toán",
    "to-confirm": "Chờ xác nhận",
    "to-ship": "Chờ lấy hàng",
    "to-receive": "Đang giao",
    "completed": "Đã nhận hàng",
    "canceled": "Huỷ đơn"
}

export const tokenGHN = '8cfe89c6-4644-11ef-80fb-0210414e18f9';
export const idGHN = 5208167;

export const axiosInstance = axios.create({
    baseURL: endpoint,
    headers: {
        'Content-Type': 'application/json'
    }
});