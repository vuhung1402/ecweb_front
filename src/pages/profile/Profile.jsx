import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import Footer from "@core/Footer";
import Loading from "@component/Loading/Loading";
import SideBar from "@pages/Profile/SideBar";

import { getProfileInfo } from "@pages/Profile/function";
import { TOKEN_INVALID } from "@utils/error";

const Profile = () => {
    const navigate = useNavigate();

    const [infor, setInfor] = useState();

    useEffect(() => {
        async function getInfo(params) {
            const res = await getProfileInfo();
            if (res?.success) setInfor(res);
            if (res?.message === TOKEN_INVALID) {
                message.info("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        getInfo();
    }, []);

    return (
        <div className="w-full h-full">
            {
                !infor ? <Loading /> :
                    (
                        <div>
                            <div className=" flex flex-col items-center justify-center font-semibold text-[30px] gap-8 p-5 border-b-[1px]">
                                <h1 className="text-center">Tài khoản của bạn</h1>
                                <span className="bg-black p-[1.5px] w-14 flex items-center justify-center"></span>
                            </div>
                            <div className="flex flex-col md:flex-row w-full md:w-[750px] me:w-[970px] xl:w-[1170px] mx-auto">
                                <div className="w-full md:w-1/4 px-5 md:px-0">
                                    <SideBar />
                                </div>
                                <div className="w-full me:w-3/4 p-5 flex flex-col gap-3">
                                    <div className="uppercase font-extrabold mb-3 border-b-[1px] pb-1">Thông tin tài khoản</div>

                                    <div>
                                        {infor?.name && <p className=" font-medium">{infor?.name}</p>}
                                        {infor?.address && <div className=" text-sm">{infor?.address}</div>}
                                        {infor?.email && <div className=" text-sm">{infor?.email}</div>}
                                        <div className="mt-1"><a className="hover:text-blue-500 text-sm font-bold cursor-pointer text-gray-500">Xem địa chỉ</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
            <div><Footer /></div>
        </div>
    );
};

export default Profile;