import { useRef, useState } from "react"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { endpoint } from "../../api"

const InsertAddress = ({setAddAddress}) => {
    
    const [isDefault, setIsDefault] = useState(false) 
    const nameRef = useRef()
    const streetRef = useRef()
    const phoneRef = useRef()

    const user = useUserPackageHook();

    const addAddress = () => {
        const body ={
            name: nameRef.current.value,
            street: streetRef.current.value,
            number: phoneRef.current.value,
            isDefault: isDefault
        }

        fetch(`${endpoint}/users/insert_address/${user?.data}/`, {
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
            if(json?.success){
                window.location.reload()
            }
            
        }).catch((error) => {
            console.error("Error: ", error)
        })
    }

    const handleChange = (e) => {
        setIsDefault(e.target.checked)
    }

    return(
        <>
            <input ref={nameRef} className="p-3 text-sm outline-none border" placeholder="Họ và tên"/>

            <input ref={streetRef} className="p-3 text-sm outline-none border" placeholder="tên đường, số nhà, phường/xã, quận/huyện, thành phố/tỉnh"/>

            <input ref={phoneRef} className="p-3 text-sm outline-none border" placeholder="Số điện thoại"/>

            <div class="flex items-center mb-4">
                <input  value = {true} onChange={handleChange}  id="default-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 outline-none"/>
                <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Đặt làm địa chỉ mặc định</label>
            </div>

            <div className=" mt-5 flex items-center"> 
                <button onClick={addAddress} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Thêm mới</button>
                <div className=" ml-2 flex gap-2">
                    <div className="">hoặc</div>
                    <p onClick={() => setAddAddress(false)} className="hover:text-blue-500 cursor-pointer" href="/forgotPass">Huỷ</p>
                </div>
            </div>
        </>
    )
}

export default InsertAddress