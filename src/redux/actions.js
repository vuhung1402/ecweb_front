import { USER_PACKAGE, CLEAR, ADDRESS } from "./constants";

export const userPackage = (user) => ({
    type: USER_PACKAGE,
    payload: user,
})

export const addressPackage = (address) => ({
    type: ADDRESS,
    payload: address,
})

export const clear = () => ({
    type: CLEAR
})

