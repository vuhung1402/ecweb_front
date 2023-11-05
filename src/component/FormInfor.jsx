import { useEffect, useState } from "react"
import { useUserPackageHook } from "../redux/hooks/userHook"
import { useDispatch } from "react-redux"
import { userPackage } from "../redux/actions"
import SuccessAlert from "./SuccesAlert"
import UnsuccessAlert from "./UnsuccessAlert"
import Loading from "./Loading"
import { endpoint } from "../api"

 const FormInfor = () => {
    const user = useUserPackageHook()
    const dispatch = useDispatch()

    const [successAlert, setSuccessAlert] = useState(false)
    const [unsuccessAlert, setUnsuccessAlert] = useState(false)

    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [gender, setGender] = useState("Male")
    const [birthday, setBirthday] = useState()
    // const [response, setResponse] = useState()

    useEffect(() => {
        fetch(`${endpoint}/users/me`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${user?.accessToken}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if(!response.ok){
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            if(json?.success){
                setName(json?.data?.user?.name)
                setPhone(json?.data?.user?.phone)
                setGender(json?.data?.user?.gender)
                setBirthday(json?.data?.user?.birthday?.split("T")[0])
                console.log("json: ", json)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    },[name])

    const handleSavechange = async () => {
        console.log("name: ", name)
        console.log("phone: ", phone)
        console.log("gender: ", gender)
        console.log("birthday: ", birthday)

        const body = {
            name : name,
            phone : phone,
            gender: gender,
            birthday: birthday
        }
        await fetch("https://tiny-jade-elk-wear.cyclic.cloud/api/users/me", {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                'Authorization': `Bearer ${user?.accessToken}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if(!response.ok){
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            if(json?.success){
                setName(json?.data?.user?.name)
                setPhone(json?.data?.user?.phone)
                setGender(json?.data?.user?.gender)
                setBirthday(json?.data?.user?.birthday?.split("T")[0])
                setSuccessAlert(true)
                setTimeout(() => {
                    setSuccessAlert(false)
                },3000)
                console.log("json: ", json)
            }
        }).catch((error) => {
            setUnsuccessAlert(true)
            setTimeout(() => {
                setSuccessAlert(false)
            },3000)
            console.error("Error: ", error)
        })
    }

    return(
        <div>
            {successAlert && <SuccessAlert/>}
            {unsuccessAlert && <UnsuccessAlert/>}
            {!name && <Loading/>}
            {name &&
                <div class="flex justify-center px-8 mt-3">
                    <div class="w-full">
                        <div class="flex flex-wrap dark:bg-gray-600">

                            <div class="flex flex-col gap-2 w-full border-gray-400">

                                <div>
                                    <label class="text-gray-600 dark:text-gray-400">
                                        User name
                                    </label>
                                    <input
                                        value={name}
                                        onChange={(e) => {setName(e.target.value)}}
                                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                        type="text"
                                    />
                                </div>

                                <div>
                                    <label class="text-gray-600 dark:text-gray-400">Phone</label>
                                    <input
                                        value={phone}
                                        onChange={(e) => {setPhone(e.target.value)}}
                                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                        type="text"/>
                                </div>

                                <div>
                                    <label class="text-gray-600 dark:text-gray-400">Gender</label>
                                <select value={gender} onChange={(e) => {setGender(e.target.value)}} className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100">
                                        <option value={"Male"}>Male</option>
                                        <option value={"Female"}>Female</option>
                                </select>
                                </div>

                                <div>
                                    <label class="text-gray-600 dark:text-gray-400">Date</label>
                                    <input
                                        value={birthday}
                                        onChange={(e) => {setBirthday(e.target.value)}}
                                        class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                        type="date"/>
                                </div>
                                <div class="flex justify-end" onClick={handleSavechange}>
                                    <button class="py-1.5 px-3 m-1 text-center bg-violet-700 border rounded-md text-white  hover:bg-violet-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700">
                                        Save changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
 }

 export default FormInfor