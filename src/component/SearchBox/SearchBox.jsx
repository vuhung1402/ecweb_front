import React from "react"

const SearchBox = () => {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })

    return(
        <div className=" p-2">
            <div className=" text-center uppercase font-semibold">
                Tìm kiếm
            </div>
            <input className=" border bg-[#f5f5f5] w-full mt-3 outline-none px-3 py-1"/>
            <div className="flex justify-between items-center mt-4 border-b-[1px]">
                <div className=" text-sm">
                    <div>FEARLESS corduroy daily cap</div>
                    <div>{VND.format(220000)}</div>
                </div>
                <img src="https://firebasestorage.googleapis.com/v0/b/imgaeproject.appspot.com/o/Shirt%2Faothun_coton_olive.jpg?alt=media&token=0c83e73d-eff4-4b66-a4a3-272ad1d05c66" className="h-[40px] w-[40px]" />
            </div>
        </div>
    )
}

export default SearchBox