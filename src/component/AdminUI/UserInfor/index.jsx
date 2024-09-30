import React from "react";
import { data } from "./mock";

const UserInfor = (props) => {
    const { userDetail } = props;

    return (
        <div className=" w-full p-3 flex flex-col gap-2 justify-center">
            <div className=" font-bold">
                Thông tin cá nhân
            </div>
            <div className=" p-3 border rounded-lg flex flex-col gap-2">
                <div className=" flex items-center gap-3">
                    <div className=" font-bold">Họ và tên:</div>
                    <div>{userDetail.ho} {userDetail.ten}</div>
                </div>
                <div className=" flex items-center gap-3">
                    <div className=" font-bold">Email:</div>
                    <div>{userDetail.email}</div>
                </div>
                <div className=" flex items-center gap-3">
                    <div className=" font-bold">Giới tính:</div>
                    <div>{userDetail.gender}</div>
                </div>
                <div className=" flex items-center gap-3">
                    <div className=" font-bold">Ngày sinh:</div>
                    <div>{userDetail.birthday}</div>
                </div>
            </div>
        </div>
    )
}

export default UserInfor