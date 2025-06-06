import React, { useState } from "react";
import UserList from "@widgets/AdminUI/UserList";
import UserContainer from "./UserContainer";
import { UserFilterWrapper, UserListWrapper } from "./User";
import UserFilter from "@widgets/AdminUI/UserFilter";

const User = (props) => {   
    const { isGetUsers, userData, isRefetchingUsers } = props;
    const { handleUserDetail, handleChangeInfor  } = props;

    const [state, setState] = useState({
        selectValue: '1',
        placeholder: '',
        isOpenModalUser: false,
        isOpenModalTransaction: false,
    });

    const handleOpenModalUserInfor = async () => {
        setState((prev) => ({ ...prev, isOpenModalUser: !state.isOpenModalUser }));
    }

    const handleOpenModalTransaction = async () => {
        setState((prev) => ({ ...prev, isOpenModalTransaction: !state.isOpenModalTransaction }));
    }

    return (
        <UserContainer>
            <UserFilterWrapper>
                <UserFilter
                    email={state.email}
                    handleChangeInfor={handleChangeInfor}
                />
            </UserFilterWrapper>
            <UserListWrapper>
                <UserList
                    isGetUsers={isGetUsers}
                    isRefetchingUsers={isRefetchingUsers}
                    handleOpenModalUserInfor={handleOpenModalUserInfor}
                    handleOpenModalTransaction={handleOpenModalTransaction}
                    isOpenModalUser={state.isOpenModalUser}
                    isOpenModalTransaction={state.isOpenModalTransaction}
                    userData={userData?.users}
                    handleUserDetail={handleUserDetail}
                />
            </UserListWrapper>
        </UserContainer>
    )
}

export default User