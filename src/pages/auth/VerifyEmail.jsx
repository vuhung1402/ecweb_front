import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import VerifyPopUp from "../../component/VerifyPopUp"
import { endpoint } from "../../api"

const VerifyEmail = () => {
    const {code} = useParams()
    const [response, setRespone] = useState()
    const navigate = useNavigate()


    useEffect(() => {
        const body = {
            code: code,
        }

        fetch(`${endpoint}{/auth/verify/email`, {
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
            console.log("Response: ", json)
            if(json?.success){
                navigate("/login")
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    },[])

    return(
        <div>
            {
                response?.success && 
                (<div>Success</div>)
            }
        </div>
    )

}

export default VerifyEmail