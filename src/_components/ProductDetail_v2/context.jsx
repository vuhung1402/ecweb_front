import React from "react"

import { createContext, useContext } from "react"

const ProductDetailContext = createContext({
    product: {}
})

export default function ProductDetailContextProvider({ children, ...props }) {
    return <ProductDetailContext.Provider value={props}>{children}</ProductDetailContext.Provider>
}

export const useProductDetailContext = () => {
    const context = useContext(ProductDetailContext)

    if (!context) {
        throw new Error('useProductDetailContext must be used within ProductDetailContextProvider')
    }

    return context
}