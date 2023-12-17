import { useState } from "react"
import AllProduct from "./AllProduct"
import AddProduct from "./AddProduct"


const ProductListSeller = () => {

    const [nav, setNav] = useState(1)

    return(
        <div>
            <nav class=" dark:bg-gray-700 border-b-2">
                <div class="w-full px-4 py-3">
                    <div class="flex items-center w-full">
                        <ul class="flex flex-row w-full justify-evenly font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <div onClick={() => setNav(1)} class={`text-gray-900 dark:text-white hover:underline cursor-pointer ${nav === 1 && "underline"} `} aria-current="page">Products</div>
                            </li>
                            <li>
                                <div onClick={() => setNav(2)} class={`text-gray-900 dark:text-white hover:underline cursor-pointer ${nav === 2 && "underline"}`}>Add Produts</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {nav === 1 && <AllProduct/>}
            {nav === 2 && <AddProduct/>}
        </div>
    )
}

export default ProductListSeller