import { endpoint } from "@api/api"
import { useUserPackageHook } from "@redux/hooks/userHook"
import { message } from "antd"
import axios from "axios";

const token = localStorage.getItem("token");
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    headers:{
        'Content-Type': 'application/json',
        "token" : `${token}`,
    }
})

export const updateOnlShopStatus = async (id, onlShop) => {
    const body = {
        id,
        onlShop,
    };

    try {
        const response = await fetch(`${endpoint}/admin/update_onlShop_product`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "token" : `${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export const getProducts = async (id) => {
    try {
        const response = await fetch(`${endpoint}/admin/admin_to_get_product_list/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if(data?.success){
            return data?.formatted_product
        }else{
            return [];
        }
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export const getCategories = async () => {
    try {
        const response = await fetch(`${endpoint}/admin/Admin_get_all_category`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data?.category;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }

}

export const addCategory = async (name) => {
    const body = {
        name,
    }

    try {
        const response = await fetch(`${endpoint}/admin/add_primary_category`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "token" : `${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export const deleteCategory = async (category_id) => {
    const body = {
        category_id
    }

    try {
        const response = await fetch(`${endpoint}/admin/deleteCategory`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "token" : `${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data?.success;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export const editCategory = async (name, category_id) => {
    const body = {
        name,
        category_id,
    }

    try {
        const response = await fetch(`${endpoint}/admin/update_Catergory`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "token" : `${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data?.success;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export const addSubCategory = async (name_sub_category, id) => {
    const body = {
        name_sub_category,
        id,
    }

    try {
        const response = await fetch(`${endpoint}/admin/add_sub_category`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "token" : `${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data?.success;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export const handleEditSubCategory = async (name, category_id, sub_category_id) => {
    const body = {
        name,
        category_id,
        sub_category_id,
    }

    try {
        const response = await fetch(`${endpoint}/admin/update_sub_category`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "token" : `${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data?.success;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export const deleteSubCategory = async (category_id, sub_category_id) => {
    const body = {
        category_id,
        sub_category_id,
    }

    try {
        const response = await fetch(`${endpoint}/admin/delete_sub_category`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "token" : `${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data?.success;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export const productDetail = async (product_id) => {
    try {
        const response = await fetch(`${endpoint}/product/getProductDetail/${product_id}`, {
            method: 'GET',
            headers: {
                "token" : `${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export const addProduct = async (body) => {
    try {
        const response = await fetch(`${endpoint}/admin/add_product`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "token" : `${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export const deleteProduct = async (product_id) => {
    const body = {
        product_id
    }

    try {
        const response = await fetch(`${endpoint}/admin/delete_product`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "token" : `${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}

export const updateProduct = async () => {
    try {
        const response = await fetch(`${endpoint}/admin/delete_product`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "token" : `${token}`,
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        message.error("Rất tiếc, trang web đang bảo trì. Vui lòng quay lại sau");
        console.error('Error:', error);
    }
}