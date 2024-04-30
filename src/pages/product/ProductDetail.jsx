import MyBreadCrumb from "../../component/BreadCrumb"
import ImagePreview from "../../component/ImagePreview"
import InfoProductDetail from "../../component/InfoProductDetail"
import Footer from "../../core/Footer"

const ProductDetail = () => {

    const data = {
        "_id": {
            "$oid": "662cad202d46e6ea1c9c5ba7"
        },
        "name": "áo khoác gió",
        "price": 295000,
        "total_number": 5,
        "array_color": [
            {
                "name_color": "red",
                "code_color": "#FF0000",
                "total_number_with_color": 4,
                "image": "",
                "array_sizes": [
                    {
                        "name_size": "XL",
                        "total_number_with_size": 1
                    },
                    {
                        "name_size": "L",
                        "total_number_with_size": 1
                    },
                    {
                        "name_size": "M",
                        "total_number_with_size": 1
                    },
                    {
                        "name_size": "S",
                        "total_number_with_size": 1
                    }
                ]
            },
            {
                "name_color": "Black",
                "code_color": "#000000",
                "total_number_with_color": 4,
                "image": "",
                "array_sizes": [
                    {
                        "name_size": "XL",
                        "total_number_with_size": 1
                    },
                    {
                        "name_size": "L",
                        "total_number_with_size": 1
                    },
                    {
                        "name_size": "M",
                        "total_number_with_size": 1
                    },
                    {
                        "name_size": "S",
                        "total_number_with_size": 1
                    }
                ]
            }
        ],
        "array_image": [
            "https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/ao%2Faothun%2FFEARLESS%20Apple%20baby%20tee%2Fz5366256165971_4721defa138815d96779a43acc9378d8.jpg?alt=media&token=65e03673-bf59-4968-8105-2f4754f3bf42",
            "https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/ao%2Faothun%2FFEARLESS%20Apple%20baby%20tee%2Fz5366287362190_86bafcf2c843af471732c2e8e9677bde.jpg?alt=media&token=a0a5e473-7058-4011-90c3-93a2aa9a4948",
            "https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/ao%2Faothun%2FFEARLESS%20Apple%20baby%20tee%2Fz5366290127366_5d506f4e500cc1c7620ebe8eb3954877.jpg?alt=media&token=e7fd7254-a805-4d82-9038-e688dcc8aa74",
        ],
        "primary_image": "link",
        "iamge_hover": "link"
    }

    return (
        <div className="">
            <div className="">
                <div className=" px-[85px] w-full h-[40px] flex items-center bg-[rgb(245,245,245)]">
                    <MyBreadCrumb/>
                </div>
                <div className=" px-[85px] flex pt-7">
                    <div className=" w-2/3 h-fit">
                        <ImagePreview imageArray = {data?.array_image} />
                    </div>
                    <div className=" flex flex-grow">
                        <InfoProductDetail data = {data} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductDetail