import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from './Loading'
import { endpoint } from '../api'
import { useUserPackageHook } from '../redux/hooks/userHook'
import SuccessAlert from './SuccesAlert'
import UnsuccessAlert from './UnsuccessAlert'

  
  export default function ProductOverview() {
    const user = useUserPackageHook()
    const {slug} = useParams()
    const navigate = useNavigate()
    const [successAlert, setSuccessAlert] = useState(false)
    const [unsuccessAlert, setUnsuccessAlert] = useState(false)
    const [productDetail, setProductDetail] = useState()
    const [indexVariation, setIndexVariation] = useState(0)

    // useEffect(() => {
    //   fetch(`${endpoint}/products/${slug}`, {
    //       method: "GET",
    //       headers: {
    //           'Content-Type': 'application/json',
    //       },
    //   }).then((response) => {
    //       if(!response.ok){
    //           throw new Error("Netword response not ok")
    //       }
    //       return response.json()
    //   }).then((json) => {
    //       if(json?.success){
    //           setProductDetail(json?.data?.product)
    //           console.log("json: ", json)
    //       }
    //   }).catch((error) => {
    //       console.error("Error: ", error)
    //   })
    // },[])

    const handleAddToCart = () =>{
      console.log(productDetail?.variations[indexVariation])
      const body = {
        productId: productDetail?._id,
        variationId: productDetail?.variations[indexVariation]?._id
      }

      fetch(`${endpoint}/carts`, {
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

    const handleShopProfile = () => {
      navigate(`/shop/${productDetail?.shopId?._id}`,
        {
          state: productDetail?.shopId
        }
      )
    }
    
    return (
      <div>
        Hello
      </div>
    )
  }