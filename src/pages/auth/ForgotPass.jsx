import { useRef } from "react"
import { useNavigate } from "react-router-dom"

const ForgotPass = () => {
    const emailRef = useRef()

    const navigate = useNavigate();

    const handleResetPass = () => {
        console.log("email: ", emailRef.current.value)

        // fetch("http://localhost:3001/api/auth/forgot-password", {
        //     method: "GET",
        // }).then((response) => {
        //     if(!response.ok){
        //         throw new Error("Netword response not ok")
        //     }
        //     return response.json()
        // }).then((json) => {
        //     setResponse(json)
        //     console.log("Response: ", json)
        // }).catch((error) => {
        //     console.error("Error: ", error)
        // })
        navigate(`/resetPass`)
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