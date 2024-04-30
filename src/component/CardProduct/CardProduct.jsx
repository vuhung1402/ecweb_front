import { useState } from "react"

const CardProduct = () => {
    const data = {
        _id: '3812983iuasgdjahgsd',
        name: 'san pham 1',
        price: '200000',
        image: 'https://product.hstatic.net/200000691337/product/thun_olive_61a7b6153efb4aacac99ec880faaa8a2_master.jpg',
        imageHover: 'https://product.hstatic.net/200000691337/product/6_e467b9ee24fe422a8bfa39216b230113_master.jpg',
        // color: {
        //     '#00ff00': 
        //         "https://product.hstatic.net/200000691337/product/32_b09f46222b0e4a8786fea0a937f1447f_master.jpg",
            
        //     '#0000ff': 
        //         "https://product.hstatic.net/200000691337/product/1_e643055c59d1406797be0c1de5704121_master.jpg",
            
        //     '#ff0000': 
        //         "https://product.hstatic.net/200000691337/product/3_95ca284ab5f24f599b1415b1c28562a8_master.jpg",
            
        // }

        color:[
            {
                "name_color": "red",
                "code_color": "#00ff00",
                "image" : "https://product.hstatic.net/200000691337/product/32_b09f46222b0e4a8786fea0a937f1447f_master.jpg",
            },
            {
                "name_color": "red",
                "code_color": "#0000ff",
                "image" : "https://product.hstatic.net/200000691337/product/1_e643055c59d1406797be0c1de5704121_master.jpg",
            },
            {
                "name_color": "red",
                "code_color": "#ff0000",
                "image" : "https://product.hstatic.net/200000691337/product/3_95ca284ab5f24f599b1415b1c28562a8_master.jpg",
            }
        ]
    }
    
    // Object.keys(color).map((item) => {
    //     log(item) => color[item]
    //     color[00ff00] = "adjhaksjdhkjashdkjasd",
    // })

    const handleColorHover = (color, img) => {
        setImg(img)
    }
    
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })

    const [isHover, setIsHover] = useState(false)

    const [img, setImg] = useState(data?.image)
    const [data1, setData1] = useState()

    const onMouseEnter = () => {
        setIsHover(true)
        setImg("https://product.hstatic.net/200000691337/product/32_b09f46222b0e4a8786fea0a937f1447f_master.jpg")
    }
    
      const onMouseLeave = () => {
        setIsHover(false)
        setImg("https://product.hstatic.net/200000691337/product/thun_olive_61a7b6153efb4aacac99ec880faaa8a2_master.jpg")
    }
    
    return(
        <div className="w-[250px] h-auto p-2">
            <div className=" h-[250px] w-full flex justify-center" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                { isHover ? 
                    <img className={`w-auto h-full cursor-pointer transition-opacity duration-300 ${isHover ? 'opacity-100' : 'opacity-0'}`} src={img}/> 
                    :
                    <img className={`w-auto h-full cursor-pointer transition-opacity duration-300 ${isHover ? 'opacity-0' : 'opacity-100'}`} src={img}/>
                }
            </div>
            <div className=" font-light">{data.name}</div>
            <div className=" font-light">{VND.format(Number(data.price))}</div>
            <div className="mt-1 flex gap-3">
            {
                data.color.map((item, index) => {
                    return(
                        <div style={{backgroundColor: item?.code_color}} onMouseLeave={() => setImg(data.image)} onMouseEnter={() => handleColorHover(item, item?.image)} key={`color-${index}`} className={` cursor-pointer mr-2 border px-2 py-1 w-[20px] h-[20px] rounded-full`}></div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default CardProduct