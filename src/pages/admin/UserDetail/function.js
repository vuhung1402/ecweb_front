import React from "react";
import { axiosInstance } from "@api/api"
import { GET_USERS_DETAIL_ADMIN } from "@constants/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { logAgain } from "@utils/function";
import { SUCCESS } from "@utils/message";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

//get user detail
export const getUserDetail = async (userId) => {
    const response = await axiosInstance.get(`/admin/find-by-id/${userId}`,
        {
            requiresAuth: true,
        }
    )
    return response.data;
}

export function useGetUserDetail(userId) {
    return useQuery({
        queryFn: () => getUserDetail(userId),
        queryKey: [GET_USERS_DETAIL_ADMIN, userId], 
        enabled: !!userId,
    })

}

//add to blacklist
export const addToBlackList = async (email) => {
    // console.log(email);
    const body = {
        email
    }

    const response = await axiosInstance.post(`admin/add_to_blacklist`, JSON.stringify(body),
        {
            requiresAuth: true
        }
    );
    return response.data;
}

export function useAddToBlackList () {
    return useMutation(
        {
            mutationFn: (email) => addToBlackList(email),
        }
    )
}

//delete user
export const deleteUser = async (userId) => {
    const body = {
        userId
    }

    const response = await axiosInstance.post(`/admin/deleteUser`, JSON.stringify(body), {
        requiresAuth: true,
    });

    return response.data;
}

export function useDeleteUser () {
    return useMutation(
        {
            mutationFn: (userId) => deleteUser(userId),
        }
    )
}

//grnat role
export const grantRole = async (body) => {

    console.log({body});

    const response = await axiosInstance.post(`/admin/grantRoles`, JSON.stringify(body), {
        requiresAuth: true,
    });

    return response.data;
}

export function useGrantRole () {
    return useMutation(
        {
            mutationFn: (body) => grantRole(body),
        }
    );
}
