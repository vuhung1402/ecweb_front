import { axiosInstance } from "@api/api";

export const getProducts = async () => {
    try {
        const response = await axiosInstance.get('/product/getAllProductList/all/1');
        return response.data;
    } catch (error) {
        return error;
    };
};