import AllProduct from "./AllProduct"


const ProductListSeller = () => {


    return(
        <div>
            <nav class=" dark:bg-gray-700 border-b-2">
                <div class="w-full px-4 py-3">
                    <div class="flex items-center w-full">
                        <ul class="flex flex-row w-full justify-evenly font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <a href="#" class="text-gray-900 dark:text-white hover:underline" aria-current="page">Products</a>
                            </li>
                            <li>
                                <a href="#" class="text-gray-900 dark:text-white hover:underline">Add Produts</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <AllProduct/>
        </div>
    )
}

export default ProductListSeller