import axios from 'axios';

// export const endpoint = "https://ecweb-backend.onrender.com/api/v1"

export const endpoint = "http://localhost:4000/api/v1"



export const dateFormat = "DD/MM/YYYY"

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
export const from_district_id = 3695;

export const axiosInstance = axios.create({
    baseURL: endpoint,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use((config) => {
    if (config.requiresAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.token = `${token}`;
        };
    };
    if(config.GHN){
        config.headers.token = tokenGHN;
        config.headers.shop_id = idGHN;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});