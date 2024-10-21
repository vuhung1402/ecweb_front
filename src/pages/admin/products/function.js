import { endpoint, axiosInstance } from "@api/api"
import { GET_CATEGORIES_ADMIN, GET_PRODUCT_DETAIL_ADMIN, GET_PRODUCTS_ADMIN } from "@constants/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd"

export const updateOnlShopStatus = async (body) => {
    try {
        const response = await axiosInstance.post(`/admin/update_onlShop_product`, JSON.stringify(body),
            {
                requiresAuth: true,
            }
        )
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useUpdateOnlShopStatus () {
    return useMutation({
        mutationFn: (body) => updateOnlShopStatus(body) 
    })
}

export const getProducts = async (id) => {
    try {
        const response = await axiosInstance.get(`/admin/admin_to_get_product_list/${id}`, {
            requiresAuth: true,
        })
        return response.data
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useGetProducts (id) {
    return useQuery({
        queryFn: () => getProducts(id),
        queryKey: [GET_PRODUCTS_ADMIN, id],
        enabled: !!id,
    })
}

export const getCategories = async () => {
    try {
        const response = await axiosInstance.get(`/admin/Admin_get_all_category`, {
            requiresAuth: true,
        })
        return response.data
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useGetCategories () {
    return useQuery({
        queryFn: () => getCategories(),
        queryKey: [GET_CATEGORIES_ADMIN],
    })
}

export const addCategory = async (body) => {
    try {
        const response = await axiosInstance.post(`/admin/add_primary_category`, JSON.stringify(body), {
            requiresAuth: true,
        })
        return response.data
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useAddCategory () {
    return useMutation({
        mutationFn: (body) => addCategory(body), 
    })
}

export const deleteCategory = async (body) => {
    try {
        const response = await axiosInstance.post(`/admin/deleteCategory`, JSON.stringify(body), {
            requiresAuth: true,
        })
        return response.data
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useDeleteCategory () {
    return useMutation({
        mutationFn: (body) => deleteCategory(body),
    })
}

export const editCategory = async (body) => {
    try {
        const response = await axiosInstance.post(`/admin/update_Catergory`, JSON.stringify(body), {
            requiresAuth: true,
        })

        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useEditCategory () {
    return useMutation({
        mutationFn: (body) => editCategory(body)
    })
}

export const addSubCategory = async (body) => {
    try {
        const response = await axiosInstance.post(`/admin/add_sub_category`, JSON.stringify(body), {
            requiresAuth: true,
        })
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useAddSubCategory () {
    return useMutation({
        mutationFn: (body) => addSubCategory(body),
    })
}

export const handleEditSubCategory = async (body) => {
    try {
        const response = await axiosInstance.post(`/admin/update_sub_category`, JSON.stringify(body), {
            requiresAuth: true
        })
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useHandleEditSubCategory () {
    return useMutation({
        mutationFn: (body) => handleEditSubCategory(body),
    })
}

export const deleteSubCategory = async (body) => {

    try {
        const response = await axiosInstance.post(`/admin/delete_sub_category`, JSON.stringify(body), {
            requiresAuth: true
        })
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useDeleteSubCategory () {
    return useMutation({
        mutationFn: (body) => deleteSubCategory(body),
    })
}

export const productDetail = async (product_id) => {

    try {
        const response = await axiosInstance.get(`/admin/getProductDetail/${product_id}`, {
            requiresAuth: true,
        })
        return response.data
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useGetProductDetail (product_id) {
    return useQuery({
        queryFn: () => productDetail(product_id),
        queryKey: [GET_PRODUCT_DETAIL_ADMIN, product_id],
        enabled: !!product_id,
    })
}

export const addProduct = async (body) => {
    try {
        const response = await axiosInstance.post('/admin/add_product', JSON.stringify(body), {
            requiresAuth: true,
        });
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
    };
};

export function useAddProduct () {
    return useMutation({
        mutationFn: (body) => addProduct(body),
    })
}

export const deleteProduct = async (body) => {
    try {
        const response = await axiosInstance.post(`/admin/delete_product`, JSON.stringify(body), {
            requiresAuth: true,
        })
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useDeleteProduct () {
    return useMutation({
        mutationFn: (body) => deleteProduct(body),
    })
}

export const updateProduct = async (body) => {
    try {
        const response = await axiosInstance.post(`/admin/update_product`, JSON.stringify(body), {
            requiresAuth: true,
        })
        return response.data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export function useUpdateProduct () {
    return useMutation({
        mutationFn: (body) => updateProduct(body),
    })
}