import { axiosInstance } from "@api/api";

import { useQuery } from "@tanstack/react-query";

import { GET_PRODUCTS } from "@constants/index";

const getProducts = async () => {
    const res = await axiosInstance.get('/product/getAllProductList/all/1');
    return res.data;
};

export function useGetProducts() {
    return useQuery({
        queryFn: () => getProducts(),
        queryKey: GET_PRODUCTS
    });
};