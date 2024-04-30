import { message } from "antd"
import { useState } from "react"
import { VND, formatCurrencyVN } from "../../utils/function"

const InfoProductDetail = ({data}) => {

    const [state, setState] = useState(
        {
            number:1
        }
    )

    const handleNumber = (params) => {
        if(state.number > 1){
            if(params === "minus"){
                setState(prev => ({...prev, number: prev.number - 1}))
            }
        }

        if(params === "plus"){
            setState(prev => ({...prev, number: prev.number + 1}))
        }
    }

    const showMessage = () => {
        message.success("Thanhf coong")
    }


    return(
        <div className=" w-full">
            <div className=" text-[20px] font-semibold py-3 border-b-[1px]">{data?.name}</div>
            <div className=" text-red-500 text-[18px] font-semibold opacity-[0.92] border-b-[1px] py-3">
                {formatCurrencyVN(data?.price)}
            </div>
            <div className=" py-3 border-b-[1px] cursor-default">
                <div>
                    <div className=" text-[13px] font-light mb-2" >Den</div>
                    <div className=" bg-black rounded-full h-[23px] w-[23px]"></div>
                </div>
                <div className=" flex py-3">
                    <div className=" w-[40px] h-[40px] text-center border flex items-center justify-center">
                        <div className=" text-[16px]">M</div>
                    </div>
                </div>
            </div>

            <div className="flex items-center mt-4">
                <div onClick={() => handleNumber("minus")} className="p-3 bg-[rgb(245,245,245)]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                    </svg>
                </div>
                <input min={1} className=" outline-none border-none shadow-transparent w-28 text-center" value={state.number} type="number" />
                <div onClick={() => handleNumber("plus")} className=" p-3 bg-[rgb(245,245,245)]">
                    <svg width="15" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </div>
            </div>

            <div onClick={showMessage} className="w-full bg-[#0d4cdd] mt-3 flex items-center justify-center h-[50px] cursor-pointer">
                <div className=" text-white font-medium">Thêm vào giỏ</div>
            </div>

            <div className=" mt-5">
                <div className=" text-[14px] font-bold">Mô tả</div>
                <div className=" mt-3">
                    <div className=" text-[14px] font-bold">Chất liệu:</div>
                    <div>
                        Cotton 2c với định lượng 250gsm
                        Chất liệu dày dặn, thoáng mát, bề mặt mịn.
                    </div>
                </div>
                <div className=" mt-3">
                    <div className=" text-[14px] font-bold">Form dáng:</div>
                    <div>
                        Baby tee
                    </div>
                </div>

                <div className=" mt-3">
                    <div className=" text-[14px] font-bold">Chi tiết:</div>
                    <div>
                        Phần bo cổ áo được may theo kĩ thuật mắc xích với phối màu tương phản so với thân áo
                        Thân trước được in "Apple"
                    </div>
                </div>

                <div className=" mt-3">
                    <div className=" text-[14px] font-bold">Size: </div>
                    <div>
                        Nếu bạn đang gặp khó khăn trong việc chọn size thì hãy nhắn tin cho Fearless để được tư vấn nhé.
                    </div>
                    <div className="">
                        <img src="https://file.hstatic.net/200000691337/file/baby_tee_f8ecfd1ef52042b9997497ae80eb6396_grande.jpg" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoProductDetail