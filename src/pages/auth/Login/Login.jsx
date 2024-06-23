import React, { useRef, useState } from "react"
import { useUserPackageHook } from "../../../redux/hooks/userHook"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { userPackage } from "../../../redux/actions"
import { endpoint } from "../../../api/api"
import { message } from "antd"
import { quantityCart } from "@pages/product/function"

const Login = () => {
    const user = useUserPackageHook()
    // console.log(user)

    const[loginInfor, setLoginInfor] = useState(
        {
            email: "",
            password: ""
        }
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [notify, setNotify] = useState()
    const handleLogin = async () =>{

        await fetch(`${endpoint}/auth/`, {
            method: "POST",
            body: JSON.stringify(loginInfor),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if(!response.ok){
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            // setResponse(json)
            if(json?.success){
                localStorage.setItem("token", json?.accessToken);
                console.log({json})
                dispatch(userPackage(json));
                console.log("json?.accessToken ", json?.accessToken);
                // console.log({json});
                message.success("Đăng nhập thành công");
                navigate('/');
            }else{
                message.error(json?.message);
                setNotify(json)
            }
        }).catch((error) => {
            message.error("Trang web đang được bảo trì, vui lòng quay lại sau");
            console.error("Error: ", error)
        })

    }

    return(
        <div className="flex">
            <div className=" w-1/2 border-r-[1px] flex justify-center items-center font-semibold text-5xl">
                Đăng nhập
            </div>

            <div className=" w-1/2 p-[100px]">
                <input placeholder="Email" className=" w-full outline-none border p-3 mb-4" value={loginInfor.email} onChange={e => setLoginInfor({...loginInfor, email:e.target.value})}/>

                <input placeholder="Mật khẩu" type="password" className=" w-full outline-none border p-3" value={loginInfor.password} onChange={e => setLoginInfor({...loginInfor, password: e.target.value})}/>

                <div className=" mt-5 flex items-center"> 
                    <button onClick={handleLogin} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Đăng nhập</button>
                    <div className=" ml-2">
                        <div className=" hover:text-blue-500 cursor-pointer"><a href="/forgotPass">Quên mật khẩu?</a></div>
                        <div className=" hover:text-blue-500 cursor-pointer"><a href="/register" >Đăng ký</a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login