import React, { useEffect } from "react";
import UserDetailContainer from "./UserDetailContainer";
import { UserActionWrapper, UserAddressWrapper, UserInforWrapper, UserRolesWrapper } from "./UserDetail";
import UserInfor from "@widgets/AdminUI/UserInfor";
import UserAddress from "@widgets/AdminUI/UserAddress/UserAddress";
import UserAction from "@widgets/AdminUI/UserAction";
import { useAddToBlackList, useDeleteUser, useGetUserDetail, useGrantRole } from "./function";
import { message } from "antd";
import { FAIL, SUCCESS } from "@utils/message";
import UserRoles from "@widgets/AdminUI/UserRoles";
import useUserDetailStore from "@store/user-detail";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";

const UserDetail = (props) => {
    const { userId } = props;
    const { refetchUsers } = props;

    const { setRoles, setIsGrantRole, setInitialRole, roles, isGrantRole, initialRole } = useUserDetailStore();

    const { isLoading: isGetDetail, isSuccess: isGetDetailSuccess,
        data: userDetail, refetch: refetchDetail, isRefetching: isRefetchingDetail } = useGetUserDetail(userId);

    const mutateAddToBlackList = useAddToBlackList();

    const mutateGrantRole = useGrantRole();

    useEffect(() => {
        if (isGetDetailSuccess) {
            setRoles(userDetail?.user?.role);
            setInitialRole(userDetail?.user?.role);
        }

    }, [userId, isGetDetailSuccess, isRefetchingDetail])

    const addToBlackList = () => {
        mutateAddToBlackList.mutateAsync(userDetail?.user?.email,
            {
                onSuccess: (data, variables, contex) => {
                    message.success(SUCCESS);
                    refetchUsers();
                }
            }
        )
    }

    const grantRole = () => {
        mutateGrantRole.mutateAsync(
            { userId: userDetail?.user?._id, role: roles },

            {
                onSuccess: (data, variables, contex) => {
                    message.success(SUCCESS);
                    setIsGrantRole(true);
                    refetchDetail();
                },
                onError: (error) => {
                    const response = error?.response?.data
                    if (response?.message === TOKEN_INVALID || response?.message === NOT_AUTHENTICATION) {
                        logAgain();
                        navigate('/login');
                    } else {
                        message.error(FAIL);
                    };
                    // message.error(FAIL);
                }
            }
        )
    }

    const mutateDeleteUser = useDeleteUser();

    const deleteUser = () => {
        mutateDeleteUser.mutateAsync(userDetail?.user?._id,
            {
                onSuccess: (data, variables, contex) => {
                    message.success(SUCCESS);
                    refetchUsers();
                }
            }
        )
    }

    const handleAddRole = (value, options) => {
        setRoles(value);
    }

    if (!userId) return <div className="font-bold">Thông tin người dùng sẽ hiển thị ở đây</div>

    return (
        <UserDetailContainer isGetDetail={isGetDetail} isRefetchingDetail={isRefetchingDetail} >
            <UserInforWrapper>
                <UserInfor
                    userDetail={userDetail?.user}
                />
            </UserInforWrapper>
            <UserRolesWrapper>
                <UserRoles
                    userRoles={roles}
                    handleAddRole={handleAddRole}
                />
            </UserRolesWrapper>
            <UserAddressWrapper>
                <UserAddress
                    userAddress={userDetail?.user?.address}
                />
            </UserAddressWrapper>
            <UserActionWrapper>
                <UserAction
                    userRoles={roles}
                    initialRole={initialRole}
                    isGrantRole={isGrantRole}
                    addToBlackList={addToBlackList}
                    deleteUser={deleteUser}
                    grantRole={grantRole}
                />
            </UserActionWrapper>
        </UserDetailContainer>
    )
}

export default UserDetail