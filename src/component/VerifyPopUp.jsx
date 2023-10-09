function VerifyPopUp(){
    return(
        <div onClick={(e) => e.stopPropagation()} className="h-[200px] w-[400px] bg-white rounded-2xl">
            <div className=" text-center h-1/2 flex justify-center items-center text-lg font-semibold">MAIL XÁC NHẬN ĐÃ ĐƯỢC GỬI QUA MAIL CỦA BẠN</div>
            <div className="h-1/2 flex justify-center items-center">
                <div className="bg-green-500 h-1/2 w-[100px] rounded-2xl flex justify-center items-center cursor-pointer hover:bg-green-600">
                    <div className=" text-black font-semibold">GỬI LẠI</div>
                </div>
            </div>
        </div>
    )
}

export default VerifyPopUp