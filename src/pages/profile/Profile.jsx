import { useDispatch } from "react-redux"
import { clear } from "../../redux/actions"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { endpoint } from "../../api/api"
import Footer from "@core/Footer"
import Loading from "../../component/Loading/Loading"
import SildeBar from "./SildeBar"
import { message } from "antd"


const Profile = () => {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const user = useUserPackageHook()

    const [infor, setInfor] = useState()

    const myAlert = () => {
        const response = window.confirm("Vui lòng đăng nhập lại!!!");
        if (response) {
            dispatch(clear());
            navigate("/login")
        }
    }

    useEffect(() => {
        fetch(`${endpoint}/users/get_info/`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {

            if (json?.success) {
                setInfor(json)
            } else {
                if (json?.message === TOKEN_INVALID) {
                    message?.info("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
                    localStorage.removeItem("token");
                    navigate("/login");
                } else {
                    message?.error("Trang web đang bảo trì!");
                } 
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }, [])

    const [content, setContent] = useState(1)

    const handleLogOut = () => {
        dispatch(clear())
        navigate('/')
    }

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
                                    <SildeBar />
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
    )
}

export default Profile