import { axiosInstance } from "@api/api"
import { GET_USERS_ADMIN } from "@constants/index";
import { useQuery } from "@tanstack/react-query";

export const getUsers = async (email) => {
    const response = await axiosInstance.get(`/admin/getAllUsers${email ? `?email=${email}` : ''}`, 
        {
            requiresAuth: true,
        }
    );

    return response.data;
}

export function useGetUsers(email){
    return useQuery(
        {
            queryFn: () => getUsers(email),
            queryKey: [GET_USERS_ADMIN, email]
        }
    )
}