import { USER_PACKAGE, CLEAR, ADDRESS } from "./constants";

const userState = {
    user: {}
}

export const userReducer = (state = userState, action) =>
{
    switch (action.type)
    {
        case USER_PACKAGE:{
            return {...state, user: action.payload}
        }
        case CLEAR:{
            return {
                user: {}
            }
        }
        default:
            return state
    }
}

const addressState = {
    address : {}
}

export const addressReducer = (state = addressState, action) =>
{
    switch (action.type)
    {
        case ADDRESS:{
            return {...state, address: action.payload}
        }
        case CLEAR:{
            return {
                address: {}
            }
        }
        default:
            return state
    }
}

