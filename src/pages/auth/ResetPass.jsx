import { useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { endpoint } from "../../api"

const ResetPass = () => {
    const [response, setResponse] = useState()

    const navigate = useNavigate()

    const newPassRef = useRef()
    const confirmPassRef = useRef()

    const {resetCode} = useParams()

    const handleChangePass = () => {
        console.log("new pass: ", newPassRef.current.value)
        console.log("confirm pass: ", confirmPassRef.current.value)
        console.log("resetCode: ", resetCode)

        const body = {
            password: newPassRef.current.value,
            confirmPassword: confirmPassRef.current.value,
            resetCode: resetCode
        }

        fetch(`${endpoint}/auth/forgot-password`, {
            method: "PATCH",
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
            console.log("Response: ", json)
            if(json?.success){
                navigate('/login')
            }
        }).catch((error) => {
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
                    Change Password
                </h2>
                <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            New Password
                        </label>
                        <input
                            ref={newPassRef}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Confirm password
                        </label>
                        <input
                            ref={confirmPassRef}
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                        />
                    </div>
                    <button
                        onClick={handleChangePass}
                        type="button"
                        className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Change Password
                    </button>

                </div>
                </div>
            </div>
        </div>

    )
}

export default ResetPass