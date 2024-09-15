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
        <div className="w-full min-h-screen bg-gray-50">
            {!infor ? <Loading /> : (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-center mb-8">Tài khoản của bạn</h1>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/4">
                            <SideBar />
                        </div>
                        <div className="w-full md:w-3/4 bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Thông tin tài khoản</h2>
                            <div className="space-y-2">
                                {infor?.name && <p className="font-medium">{infor.name}</p>}
                                {infor?.address && <p className="text-sm text-gray-600">{infor.address}</p>}
                                {infor?.email && <p className="text-sm text-gray-600">{infor.email}</p>}
                                <div className="mt-4">
                                    <a href="/address" className="text-sm font-medium text-blue-500 hover:text-blue-600">
                                        Xem địa chỉ
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Profile;