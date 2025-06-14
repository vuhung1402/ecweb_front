import { endpoint, axiosInstance } from "@api/api"
import { ADMIN, GET_CATEGORIES_ADMIN, GET_PRODUCT_DETAIL_ADMIN, GET_PRODUCTS_ADMIN, QL_PRODUCT } from "@constants/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd"

export const updateOnlShopStatus = async (body) => {
    const response = await axiosInstance.post(`/admin/update_onlShop_product`, JSON.stringify(body),
        {
            requiresAuth: true,
        }
    )
    return response.data;
}

export function useUpdateOnlShopStatus() {
    return useMutation({
        mutationFn: (body) => updateOnlShopStatus(body)
    })
}

export const getProducts = async (id) => {
    const response = await axiosInstance.get(`/admin/admin_to_get_product_list/${id}`, {
        requiresAuth: true,
    })
    return response.data
}

export function useGetProducts(id, role) {
    return useQuery({
        queryFn: () => getProducts(id),
        queryKey: [GET_PRODUCTS_ADMIN, id],
        enabled: !!id && (role?.includes(ADMIN) || role?.includes(QL_PRODUCT)),
    })
}

export const getCategories = async () => {
    const response = await axiosInstance.get(`/admin/Admin_get_all_category`, {
        requiresAuth: true,
    })
    return response.data
}

export function useGetCategories(role) {
    return useQuery({
        queryFn: () => getCategories(),
        queryKey: [GET_CATEGORIES_ADMIN],
        enabled: role?.includes(ADMIN) || role?.includes(QL_PRODUCT),
    })
}

export const addCategory = async (body) => {
    const response = await axiosInstance.post(`/admin/add_primary_category`, JSON.stringify(body), {
        requiresAuth: true,
    })
    return response.data
}

export function useAddCategory() {
    return useMutation({
        mutationFn: (body) => addCategory(body),
    })
}

export const deleteCategory = async (body) => {
    const response = await axiosInstance.post(`/admin/deleteCategory`, JSON.stringify(body), {
        requiresAuth: true,
    })
    return response.data
}

export function useDeleteCategory() {
    return useMutation({
        mutationFn: (body) => deleteCategory(body),
    })
}

export const editCategory = async (body) => {
    const response = await axiosInstance.post(`/admin/update_Catergory`, JSON.stringify(body), {
        requiresAuth: true,
    })

    return response.data;
}

export function useEditCategory() {
    return useMutation({
        mutationFn: (body) => editCategory(body)
    })
}

export const addSubCategory = async (body) => {
    const response = await axiosInstance.post(`/admin/add_sub_category`, JSON.stringify(body), {
        requiresAuth: true,
    })
    return response.data;
}

export function useAddSubCategory() {
    return useMutation({
        mutationFn: (body) => addSubCategory(body),
    })
}

export const handleEditSubCategory = async (body) => {
    const response = await axiosInstance.post(`/admin/update_sub_category`, JSON.stringify(body), {
        requiresAuth: true
    })
    return response.data;
}

export function useHandleEditSubCategory() {
    return useMutation({
        mutationFn: (body) => handleEditSubCategory(body),
    })
}

export const deleteSubCategory = async (body) => {

    const response = await axiosInstance.post(`/admin/delete_sub_category`, JSON.stringify(body), {
        requiresAuth: true
    })
    return response.data;
}

export function useDeleteSubCategory() {
    return useMutation({
        mutationFn: (body) => deleteSubCategory(body),
    })
}

export const productDetail = async (product_id) => {

    const response = await axiosInstance.get(`/admin/getProductDetail/${product_id}`, {
        requiresAuth: true,
    })
    return response.data
}

export function useGetProductDetail(product_id) {
    return useQuery({
        queryFn: () => productDetail(product_id),
        queryKey: [GET_PRODUCT_DETAIL_ADMIN, product_id],
        enabled: !!product_id,
    })
}

export const addProduct = async (body) => {
    const response = await axiosInstance.post('/admin/add_product', JSON.stringify(body), {
        requiresAuth: true,
    });
    return response.data;
};

export function useAddProduct() {
    return useMutation({
        mutationFn: (body) => addProduct(body),
    })
}

export const deleteProduct = async (body) => {
    const response = await axiosInstance.post(`/admin/delete_product`, JSON.stringify(body), {
        requiresAuth: true,
    })
    return response.data;
}

export function useDeleteProduct() {
    return useMutation({
        mutationFn: (body) => deleteProduct(body),
    })
}

export const updateProduct = async (body) => {
    const response = await axiosInstance.post(`/admin/update_product`, JSON.stringify(body), {
        requiresAuth: true,
    })
    return response.data;
}

export function useUpdateProduct() {
    return useMutation({
        mutationFn: (body) => updateProduct(body),
    })
}