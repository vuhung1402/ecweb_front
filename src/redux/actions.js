import { USER_PACKAGE, CLEAR } from "./constants";

export const userPackage = (user) => ({
    type: USER_PACKAGE,
    payload: user,
})

export const clear = () => ({
    type: CLEAR
})