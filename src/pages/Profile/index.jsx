import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import Footer from "@core/Footer";
import Loading from "@component/Loading/Loading";
import SideBar from "@pages/Profile/SideBar";

import { getProfileInfo, useGetProfileInfo } from "@pages/Profile/function";
import { TOKEN_INVALID } from "@utils/error";
import ProfileContainer from "./ProfileContainer";
import { AccountInforWrapper, ContentInforWrapper, ContentWrapper, InforWrapper, SildeBarWrapper } from "./Profile";
import AccountInfor from "@_components/Profile/AccountInfor";

const Profile = () => {

    const navigate = useNavigate();

    // const [infor, setInfor] = useState();

    const { data: infor, isError, isLoading:isGetInfor } = useGetProfileInfo();

    return (
        <ProfileContainer isGetInfor = {isGetInfor} >
            <ContentWrapper>
                <InforWrapper>
                    <h1 className="text-3xl font-bold text-center mb-8">Tài khoản của bạn</h1>
                    <ContentInforWrapper>
                        <SildeBarWrapper>
                            <SideBar />
                        </SildeBarWrapper>
                        <AccountInforWrapper>
                            <AccountInfor
                                infor={infor}
                            />
                        </AccountInforWrapper>
                    </ContentInforWrapper>
                </InforWrapper>
            </ContentWrapper>
            <Footer />
        </ProfileContainer>
    )
}

export default Profile;