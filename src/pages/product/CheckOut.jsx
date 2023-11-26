import { useParams } from "react-router-dom"
import Order from "../../component/Order"
import { useUserPackageHook } from "../../redux/hooks/userHook"
import { endpoint } from "../../api"
import { useEffect, useState } from "react"

const CheckOut = () => {

    const {code} = useParams()

    const user = useUserPackageHook()

    const [data, setData] = useState()

    useEffect(() => {
        fetch(`${endpoint}/orders/checkout?code=${code}`, {
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
                setData(json?.data)
                console.log("json: ", json?.data)
            }
            // console.log("json: ", json)
        }).catch((error) => {
            console.error("Error: ", error)
        })
    },[])

    return(
        <div>
            <Order data = {data} />
        </div>
    )
}

export default CheckOut