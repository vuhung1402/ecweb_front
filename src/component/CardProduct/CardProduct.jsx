import { useState } from "react"

const CardProduct = () => {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })

    const [img, setImg] = useState('https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/Shirt%2Faothun_coton_olive.jpg?alt=media&token=0c83e73d-eff4-4b66-a4a3-272ad1d05c66')

    const onMouseEnter = () => {
        setImg("https://product.hstatic.net/200000691337/product/32_b09f46222b0e4a8786fea0a937f1447f_master.jpg")
    }
    
      const onMouseLeave = () => {
        setImg("https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/Shirt%2Faothun_coton_olive.jpg?alt=media&token=0c83e73d-eff4-4b66-a4a3-272ad1d05c66")
    }
    
    return(
        <div className=" p-2">
            <img onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className=" h-[248px] w-[250px] cursor-pointer" src={img}/>
            <div>FEARLESS corduroy daily cap</div>
            <div className=" font-semibold">{VND.format(375000)}</div>
            <div className="mt-1">
            <span className=" cursor-pointer mr-2 border px-2 py-1">Đỏ</span>
            <span className=" cursor-pointer mr-2 border px-2 py-1">Đen</span>
            <span className=" cursor-pointer mr-2 border px-2 py-1">Vàng</span>
            </div>
        </div>
    )
}

export default CardProduct