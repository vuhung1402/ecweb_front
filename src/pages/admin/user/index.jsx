import { Button, Input, Select } from "antd";
import React, { useState } from "react";
import { optionSearchOrder } from "../orders/mock";
import { SearchOutlined } from "@ant-design/icons";
import { filterUser } from "./mock";
import UserList from "@component/AdminUI/UserList";
import UserContainer from "./UserContainer";
import { UserFilterWrapper, UserListWrapper } from "./User";
import UserFilter from "@component/AdminUI/UserFilter";
import { useGetUsers } from "./function";
import Loading from "@component/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { NOT_AUTHENTICATION, TOKEN_INVALID } from "@utils/error";
import { logAgain } from "@utils/function";

const User = (props) => {
    const { userId, isGetUsers, userData, isRefetchingUsers } = props;
    const { handleUserDetail, handleChangeInfor  } = props;

    const [state, setState] = useState({
        selectValue: '1',
        placeholder: '',
        isOpenModalUser: false,
        isOpenModalTransaction: false,
    });

    const navigate = useNavigate();

    const handleSelect = (value, option) => {
        state.selectValue = value;
        state.placeholder = option?.label;
        setState((prev) => ({ ...prev }));
    }

    const handleOpenModalUserInfor = async () => {
        setState((prev) => ({ ...prev, isOpenModalUser: !state.isOpenModalUser }));
    }

    const handleOpenModalTransaction = async () => {
        setState((prev) => ({ ...prev, isOpenModalTransaction: !state.isOpenModalTransaction }));
    }

    // if(!userData?.success) {
    //     if(userData?.message === TOKEN_INVALID || userData?.message === NOT_AUTHENTICATION){
    //         logAgain();
    //         navigate('/login');
    //     }
    // }


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