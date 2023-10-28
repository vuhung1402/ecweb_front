import { useState } from "react"
import { useUserPackageHook } from "../redux/hooks/userHook"

 const FormInfor = () => {
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [gender, setGender] = useState("Men")
    const [birthday, setBirthday] = useState()

    const user = useUserPackageHook()

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
            },
        }).then((response) => {
            if(!response.ok){
                throw new Error("Netword response not ok")
            }
            return response.json()
        }).then((json) => {
            // setResponse(json)
            if(json?.success){
                console.log("json: ", json)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }

    return(
        <div>
            <div class="flex justify-center px-8 mt-3">
                <div class="w-full">
                    <div class="flex flex-wrap dark:bg-gray-600">

                        <div class="flex flex-col gap-2 w-full border-gray-400">

                            <div>
                                <label class="text-gray-600 dark:text-gray-400">
                                    User name
                                </label>
                                <input
                                    onChange={(e) => {setName(e.target.value)}}
                                    class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                    type="text"
                                />
                            </div>

                            <div>
                                <label class="text-gray-600 dark:text-gray-400">Phone</label>
                                <input
                                    onChange={(e) => {setPhone(e.target.value)}}
                                    class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                    type="text"/>
                            </div>

                            <div>
                                <label class="text-gray-600 dark:text-gray-400">Gender</label>
                               <select onChange={(e) => {setGender(e.target.value)}} className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100">
                                    <option value={"Male"}>Male</option>
                                    <option value={"Female"}>Female</option>
                               </select>
                            </div>

                            <div>
                                <label class="text-gray-600 dark:text-gray-400">Date</label>
                                <input
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
        </div>
    )
 }

 export default FormInfor