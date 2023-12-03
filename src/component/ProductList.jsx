import { useEffect, useState } from "react"
import Loading from "./Loading"
import { endpoint } from "../api"

const ProductList = (props) => {
  const {search, category, shopId} = props 
  const [products, setProducts] = useState()

  useEffect(() => {
    if(search){
      fetch(`${endpoint}/products?search=${search}`, {
        method: "GET",
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
              setProducts(json?.data?.products)
              console.log("json: ", json)
          }
      }).catch((error) => {
          console.error("Error: ", error)
      })
    }else if(category){
      fetch(`${endpoint}/products?category=${category}`, {
        method: "GET",
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
              setProducts(json?.data?.products)
              console.log("json: ", json)
          }
      }).catch((error) => {
          console.error("Error: ", error)
      })
    }else if(shopId){
      fetch(`${endpoint}/shops/${shopId}/products`, {
        method: "GET",
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
              setProducts(json?.data?.products)
              console.log("json: ", json)
          }
      }).catch((error) => {
          console.error("Error: ", error)
      })
    }else{
      fetch(`${endpoint}/products?limit=8&page=1`, {
        method: "GET",
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
              setProducts(json?.data?.products)
              console.log("json: ", json)
          }
      }).catch((error) => {
          console.error("Error: ", error)
      })
    }
  },[search,category])

    const products1 = [
      {
        id: 1,
        name: 'Earthen Bottle',
        href: '#',
        price: '$48',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
      },
      {
        id: 2,
        name: 'Nomad Tumbler',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
      },
      {
        id: 3,
        name: 'Focus Paper Refill',
        href: '#',
        price: '$89',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
      },
      {
        id: 4,
        name: 'Machined Mechanical Pencil',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      },
      // More products...
    ]
  
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product</h2>
          { !products && <Loading/>}
  
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products?.map((product) => (
              <a key={product.slug} href={`/productDetail/${product.slug}`} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={"https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
  
    )
  }
  
  export default ProductList
  