import React from "react";

const ImagePreview = ({imageArray}) => {
    console.log(imageArray)
    return(
        <div className=" flex gap-3 h-fit">
            <div className=" flex flex-col gap-3 sticky top-0">
                {
                    imageArray?.map((item) => {
                        return(
                            <div className=" w-[64px] h-[64px] border"><img src={item} /></div>
                        )
                    })
                }
            </div>
            <div className=" flex flex-col gap-3">
                {
                    imageArray?.map((item) => {
                        return(
                            <div className=" w-[635px] h-[635px]"><img src={item} /></div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ImagePreview