import React from "react";
import UserDetailContainer from "./UserDetailContainer";
import { UserActionWrapper, UserAddressWrapper, UserInforWrapper } from "./UserDetail";
import UserInfor from "@component/AdminUI/UserInfor";
import UserAddress from "@component/AdminUI/UserAddress/UserAddress";
import UserAction from "@component/AdminUI/UserAction";
import { useGetUserDetail } from "./function";
import Loading from "@component/Loading/Loading";

const UserDetail = (props) => {
    const { userId } = props;

    if (!userId) return <div className="font-bold">Thông tin người dùng sẽ hiển thị ở đây</div>

    const { isLoading: isGetDetail, data: userDetail, } = useGetUserDetail(userId);

    if(isGetDetail) return <Loading/>

    // {
    //     "success": true,
    //     "user": {
    //         "_id": "6663a25a208960e6b253f1e0",
    //         "ho": "Dinh",
    //         "ten": "Quan",
    //         "gender": "Nam",
    //         "birthday": "16/10/2002",
    //         "email": "dinhquanfananime3@gmail.com",
    //         "isAdmin": false,
    //         "verified": false,
    //         "address": [],
    //         "__v": 0
    //     },
    //     "color": "text-green-500"
    // }

    return(
        <UserDetailContainer>
            <UserInforWrapper>
                <UserInfor
                    userDetail={userDetail?.user}
                />
            </UserInforWrapper>
            <UserAddressWrapper>
                <UserAddress
                    userAddress={userDetail?.user?.address}
                />
            </UserAddressWrapper>
            <UserActionWrapper>
                <UserAction
                    email={userDetail?.user?.email}
                />
            </UserActionWrapper>
        </UserDetailContainer>
    )
}

export default UserDetail