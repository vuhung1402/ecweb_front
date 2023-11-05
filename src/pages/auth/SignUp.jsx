import { endpoint } from "../../api";
import VerifyPopUp from "../../component/VerifyPopUp";
import { useRef, useState } from "react";

function SignUp(){
    const emailRef = useRef(null);
    const passwordRef = useRef(null)
    const confirmPassRef = useRef(null)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPass, setConfirmPass] = useState()
    const [checkPass, setCheckPass] = useState(false)
    const [checkMailSent, setCheckMailSent] = useState(false)
    const [checkMailSentErr, setCheckMailSentErr] = useState(false)
    const [message, setMessage] = useState()
    const [errorCode, setErroreCode] = useState()

    const [respone, setRespone] = useState()

    const [verifyPopUp, setVerifyPopUp] = useState(false)

    const handleSignIn =  () => {
        // setVerifyPopUp(!verifyPopUp);
        // console.log("email: ",email);
        // console.log("pass: ",password);
        // console.log("confirm: ",confirmPass);
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: confirmPassRef.current.value,
        }

        if(password === confirmPass){
            fetch(`${endpoint}/auth/register`, {
            method:"POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
              },
            }).then((response) => {
                if(!response.ok){
                    setErroreCode(response.status)
                    throw new Error(`Netword response not ok ${response.status}`)
                }
                return response.json()
            }).then((json) => {
                if(json?.success){
                    setCheckMailSent(true)
                    console.log("respone: ", json)
                }
            }).catch((e) => {
                setCheckMailSentErr(true)
                console.log("e", e)
            })
        }else{
            setCheckPass(true)
        }
        
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
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create and account
                    </h1>
                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                            Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com"
                                required=""
                                ref={emailRef}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required=""
                                ref={passwordRef}
                                onChange={(e) => setPassword(e.target.value)}
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
                                type="password"
                                name="confirm-password"
                                id="confirm-password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required=""
                                ref={confirmPassRef}
                                onChange={(e) => setConfirmPass(e.target.value)}
                            />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                            <input
                                id="terms"
                                aria-describedby="terms"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                required=""
                            />
                            </div>
                            <div className="ml-3 text-sm">
                            <label
                                htmlFor="terms"
                                className="font-light text-gray-500 dark:text-gray-300"
                            >
                                I accept the{" "}
                                <a
                                className="font-medium text-blue-700 hover:underline dark:text-primary-500"
                                href="#"
                                >
                                Terms and Conditions
                                </a>
                            </label>
                            </div>
                        </div>
                        {
                            checkPass &&
                            (
                                <div className="mt-1 text-pink-600 text-sm text-xls font-medium">
                                    Your password and confirm password do not match !!
                                </div>
                            )
                        }
                        {
                            checkMailSent &&
                            (
                                <div className="mt-1 text-green-600 text-xls font-medium">
                                    We've just sent you a verify email
                                </div>
                            )
                        }
                        {
                            errorCode === 409 &&
                            (
                                <div className="mt-1 text-pink-600 text-sm text-xls font-medium">
                                    Your email already exist !!!
                                </div>
                            )
                        }
                        <button
                            onClick={handleSignIn}
                            className="w-full text-white bg-sky-500	 hover:bg-sky-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Create an account
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            >
                                Login here
                            </a>
                        </p>
                    </div>
                </div>
                </div>
            </div>
            {/* {
                respone?.success &&
                (
                    <div onClick={handleSignIn} className="fixed inset-0 bg-[rgba(184,184,184,0.35)] bg-opacity-90 flex justify-center items-center">
                        <VerifyPopUp/>
                    </div>
                ) 
            } */}
        </div>

    )
}

export default SignUp