import { useState } from "react"
import InforProduct from "./InforProduct"
import UploadImage from "./UploadImage"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { endpoint } from "../../api"
import SuccessAlert from "../../component/SuccesAlert"
import UnsuccessAlert from "../../component/UnsuccessAlert"

const AddProduct = () => {
    const [body, setBody] = useState({})
    const [images, setImages] = useState([])

    const [successAlert, setSuccessAlert] = useState(false)
    const [unsuccessAlert, setUnsuccessAlert] = useState(false)

    const user = useUserPackageHook()

    const handleAddProduct = () => {
        fetch(`${endpoint}/products/me`, {
            method: "POST",
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
                console.log("json: ", json)
                setSuccessAlert(true)
                setTimeout(() => {
                    setSuccessAlert(false)
                },3000)
            }
        }).catch((error) => {
            setUnsuccessAlert(true)
            setTimeout(() => {
                setUnsuccessAlert(false)
            },3000)
            console.error("Error: ", error)
        })
    }

    console.log(body)

    return(
        <div>
            { successAlert && <SuccessAlert/>}
            { unsuccessAlert && <UnsuccessAlert/>}
            <UploadImage setBody = {setBody} setImages = {setImages} />
            <InforProduct setBody = {setBody} />

            <button onClick={() => handleAddProduct()} type="button" class="text-white mt-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Thêm sản phẩm</button>
        </div>
    )
}

export default AddProduct