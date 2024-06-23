import { USER_PACKAGE, CLEAR, ADDRESS, NUM_OF_CART } from "./constants";

export const userPackage = (user) => ({
    type: USER_PACKAGE,
    payload: user,
})

export const addressPackage = (address) => ({
    type: ADDRESS,
    payload: address,
})

export const numOfCartPackage = (numOfCart) => ({
    type: NUM_OF_CART,
    payload: numOfCart,
})

export const clear = () => ({
    type: CLEAR
})

