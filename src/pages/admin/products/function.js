import { endpoint } from "@api/api"
import { useUserPackageHook } from "@redux/hooks/userHook"

export const getCategories = (url) => {
    const api = url?.split('=')?.[1];
    // const user = useUserPackageHook()
    // fetch(`${endpoint}/users/insert_address/${user?.data}/`, {
    //     method: "POST",
    //     body: JSON.stringify(body),
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // }).then((response) => {
    //     if(!response.ok){
    //         throw new Error("Netword response not ok")
    //     }
    //     return response.json()
    // }).then((json) => {
    //     if(json?.success){
    //         getDataAddress()
    //         message.success("Thêm địa chỉ thành công")
    //     }
        
    // }).catch((error) => {
    //     console.error("Error: ", error)
    // })
    console.log("Url: ", api)
    
}

export const getProductsByCategory = (idCategory) => {
    // const user = useUserPackageHook()
    // fetch(`${endpoint}/users/insert_address/${user?.data}/`, {
    //     method: "POST",
    //     body: JSON.stringify(body),
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // }).then((response) => {
    //     if(!response.ok){
    //         throw new Error("Netword response not ok")
    //     }
    //     return response.json()
    // }).then((json) => {
    //     if(json?.success){
    //         getDataAddress()
    //         message.success("Thêm địa chỉ thành công")
    //     }
        
    // }).catch((error) => {
    //     console.error("Error: ", error)
    // })
    console.log("getProductsByCategory: ", idCategory)
}

export const changeStatusOnlShop = (productId, checked) => {
    // const user = useUserPackageHook()
    // fetch(`${endpoint}/users/insert_address/${user?.data}/`, {
    //     method: "POST",
    //     body: JSON.stringify(body),
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // }).then((response) => {
    //     if(!response.ok){
    //         throw new Error("Netword response not ok")
    //     }
    //     return response.json()
    // }).then((json) => {
    //     if(json?.success){
    //         getDataAddress()
    //         message.success("Thêm địa chỉ thành công")
    //     }
        
    // }).catch((error) => {
    //     console.error("Error: ", error)
    // })
}

export const createCategory = (name) => {
    console.log("createCategory: ", name)
}

export const deleteCategory = (id) => {
    console.log("deleteCategory: ", id)
}

export const editSubCategory = (categoryId, subCategoryId, name) => {
    console.log("categoryId: ", categoryId);
    console.log("subCategoryId: ", subCategoryId);
    console.log("name: ", name);
}