import { USER_PACKAGE, CLEAR } from "./actionTypes";

export const userPackage = (user) => ({
    type: USER_PACKAGE,
    payload: user,
})

export const clear = () => ({
    type: CLEAR
})