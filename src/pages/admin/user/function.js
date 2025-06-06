import { axiosInstance } from "@api/api"
import { ADMIN, GET_USERS_ADMIN, QL_USER } from "@constants/index";
import { useQuery } from "@tanstack/react-query";

export const getUsers = async (email) => {
    const response = await axiosInstance.get(`/admin/getAllUsers${email ? `?email=${email}` : ''}`, 
        {
            requiresAuth: true,
        }
    );

    return response.data;
}

export function useGetUsers(email, role){
    return useQuery(
        {
            queryFn: () => getUsers(email),
            queryKey: [GET_USERS_ADMIN, email],
            enabled: role?.includes(ADMIN) || role?.includes(QL_USER),
        }
    )
}