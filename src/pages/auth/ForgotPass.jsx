import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { endpoint } from "../../api"

const ForgotPass = () => {
    const [notify, setNotify] = useState()
    const emailRef = useRef()

    const handleResetPass = () => {
        console.log("email: ", emailRef.current.value)
        const body = {
            email: emailRef.current.value
        }

        fetch(`${endpoint}/users/forgot-password/`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if(!response.ok){
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            setNotify(json)
            
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }

    return(
        <div className="flex">
            <div className=" w-1/2 border-r-[1px] flex justify-center items-center font-semibold text-5xl">
                Khôi phục mật khẩu
            </div>



            <div className=" w-1/2 p-[100px]">
                <input ref={emailRef} placeholder="Email" className=" w-full outline-none border p-3 mb-4"/>
                {
                    notify && 
                    (
                        <p className={`${notify?.color}`}>{notify?.message}</p>
                    )
                }
                <div className=" flex gap-2 items-center">
                    <button onClick={handleResetPass} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Gửi</button>
                    <a href="/login">Huỷ</a>
                </div>
            </div>
        </div>
    )
}

export default ForgotPass