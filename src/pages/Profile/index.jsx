import React from "react";

import Footer from "@core/Footer";
import SideBar from "@widgets/SideBar";

import { useGetProfileInfo } from "@pages/Profile/function";
import ProfileContainer from "./ProfileContainer";
import { AccountInforWrapper, ContentInforWrapper, ContentWrapper, InforWrapper, SildeBarWrapper } from "./Profile";
import AccountInfor from "@_components/Profile/AccountInfor";

const Profile = () => {
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