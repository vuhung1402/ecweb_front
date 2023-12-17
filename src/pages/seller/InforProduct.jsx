import { useEffect, useState } from "react"
import { endpoint } from "../../api"

const InforProduct = () => {

    const [categories, setCategories] = useState()
    const [mainCategorieSlug, setMainCategorieSlug] = useState("")
    const [subCategorieSlug, setSubCategorieSlug] = useState()
    const [variations, setVariations] = useState([{name: "", price: "", stock: ""}])

    useEffect(() => {
        fetch(`${endpoint}/categories`, {
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
                setCategories(json?.data?.categories)
                console.log("json: ", json)
            }
        }).catch((error) => {
            console.error("Error: ", error)
        })
    },[])

    const handleClick = () => {
        setVariations([...variations,{name: "", price: "", stock: ""}])
    }

    const handleChange = (e,i) => {
        const {name,value} = e.target
        const onChangeVal = [...variations]
        onChangeVal[i][name] = value
        setVariations(onChangeVal)
    }

    const handleDelete = (i) => {
        const deleteVariation = [...variations]
        deleteVariation.splice(i,1)
        setVariations(deleteVariation)
    }

    return(
        <div className="mt-8">
            <div className="flex items-center px-2 mb-4">
                <div for="first_name" className="block mb-2 mr-9 text-sm font-medium text-gray-900 dark:text-white">Tên sản phẩm</div>
                <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="John" required/>
            </div>

            <div className="flex items-center px-2 mb-4">
                <div for="first_name" className="block mb-2 mr-5 text-sm font-medium text-gray-900 dark:text-white">Mô tả sản phẩm</div>
                {/* <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="John" required/> */}

                <textarea className="bg-gray-50 border h-[100px] border-gray-300 text-gray-900 text-sm rounded-lg block flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="John" required></textarea>
            </div>
            
            <div className="flex items-center px-2 mb-4">
                <div for="countries" class="block mb-2 mr-9 text-sm font-medium text-gray-900 dark:text-white">Nghành hàng</div>
                <select onChange={(e) => setMainCategorieSlug(e.target.value)} id="countries" class="bg-gray-50 border flex-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {
                        categories?.map((categorie) => {
                            return(
                                <option value={categorie?.slug}>{categorie?.name}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="flex items-center px-2 mb-4">
                <div for="countries" class="block mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-white">Nghành hàng phụ</div>
                <select onChange={(e) => setSubCategorieSlug(e.target.value)} id="countries" class="bg-gray-50 border flex-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {
                        mainCategorieSlug &&
                        categories[categories?.findIndex((categorie) => categorie?.slug === mainCategorieSlug)]?.subCategories?.map((subCategorie) =>{
                            return(
                                <option value={subCategorie?.slug}> {subCategorie?.name} </option>
                            )
                        })
                    }
                </select>
            </div>

            <div className="flex px-2 mb-4">
                <div for="countries" className="block mb-2 mr-9 text-sm font-medium text-gray-900 dark:text-white mt-3">Phân loại hàng</div>
                <div className=" flex-1">
                    {
                        variations?.map((variation, index) => {
                            return(
                                <div className="mb-10 mt-5">
                                    <div>
                                        <div className="flex">
                                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên phân loại {index + 1}</label>
                                            <div onClick={() => handleDelete(index)} className=" cursor-pointer ml-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                        </div>
                                        <input type="text" name="name" value={variation?.name} onChange={(e) => handleChange(e,index)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="VD:màu đỏ, 12Gb Ram - 512Gb" required/>
                                    </div>
                                    <div>
                                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giá của phân loại {index + 1}</label>
                                        <input type="text" name="price" value={variation?.price} onChange={(e) => handleChange(e,index)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="VD: 200000000" required/>
                                    </div>
                                    <div> 
                                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số lượng ở trong kho</label>
                                        <input type="text" name="stock" value={variation?.stock} onChange={(e) => handleChange(e,index)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="VD: 2" required/>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                    <button onClick={handleClick} type="button" class="text-white mt-2 float-right bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Thêm phân loại</button>
                </div>

            </div>
            
            <div className="flex items-center px-2 mb-4">
                <div for="first_name" className="block mb-2 mr-6 text-sm font-medium text-gray-900 dark:text-white">Cân nặng khi đóng gói</div>
                <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="" required/>
            </div>

            <div className="flex items-center px-2 mb-4">
                <div for="first_name" className="block mb-2 mr-9 text-sm font-medium text-gray-900 dark:text-white">Kích thước đóng gói</div>
                <div className="flex">
                    <input type="text" id="first_name" class="bg-gray-50 border mr-3 border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Rộng" required/>
                    <input type="text" id="first_name" class="bg-gray-50 border mr-3 border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Dài" required/>
                    <input type="text" id="first_name" class="bg-gray-50 border mr-3 border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Cao" required/>
                </div>
            </div>
        </div>
    )
}

export default InforProduct