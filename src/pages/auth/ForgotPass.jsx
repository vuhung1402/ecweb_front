import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { endpoint } from "../../api"

const ForgotPass = () => {
    const [response, setResponse] = useState()
    const emailRef = useRef()

    const [checkMailSent, setCheckMailSent] = useState(false)
    const [checkError, setCheckError] = useState(false)

    const handleResetPass = () => {
        console.log("email: ", emailRef.current.value)
        const body = {
            email: emailRef.current.value
        }

        fetch(`${endpoint}/auth/forgot-password`, {
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
            // setResponse(json)
            if(json?.success){
                setCheckError(false)
                setCheckMailSent(true)
                console.log("respone: ", json)
            }
        }).catch((error) => {
            setCheckError(true)
            console.error("Error: ", error)
        })
    }

    return(
        <div className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="/"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                <img
                    className="w-8 h-8 mr-2"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                    alt="logo"
                />
                Flowbite
                </a>
                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Your email
                </h2>
                <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                    <div>
                        <input
                            ref={emailRef}
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@company.com"
                            required=""
                        />
                    </div>
                    {
                        checkMailSent &&
                        (
                            <div className="mt-1 text-green-600 text-xls font-medium">
                                We've just sent you a verify email
                            </div>
                        )
                    }
                    {
                        checkError &&
                        (
                            <div className="mt-1 text-pink-600 text-sm text-xls font-medium">
                                Please check your email again !!!
                            </div>
                        )
                    }
                    <button
                        onClick={handleResetPass}
                        type="button"
                        className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Reset Password
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPass