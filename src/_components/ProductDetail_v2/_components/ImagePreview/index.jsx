import React, { useRef } from "react"

import { Carousel } from "antd"
import { useProductDetailContext } from "@_components/ProductDetail_v2/context"

import './styles.scss'

const ImagePreview = () => {
    const { product } = useProductDetailContext()

    const carouselRef = useRef();

    const imageArray = product?.array_image ?? []

    return (
        <div className='rounded-lg shadow-sm overflow-hidden w-full h-full flex justify-center'>
            <div className="h-full w-full">
                <Carousel
                    rootClassName="w-full slide-show-prodcut-detail"
                    className="w-full items-center justify-center"
                    ref={carouselRef}
                    customPaging={(i) => {
                        return <img alt="img" key={`img-carousel-preview-${i}`} src={imageArray?.[i]?.url} className="object-cover" />
                    }}
                >
                        {
                            imageArray?.map((item, index) => {
                                return (
                                    <img alt="img" key={`img-carousel-${index}`} src={item?.url} className="!w-[600px] h-[600px] object-cover" />
                                )
                            })
                        }
                </Carousel>
            </div>
        </div>
    )
}

export default ImagePreview