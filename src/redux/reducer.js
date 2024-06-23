import { USER_PACKAGE, CLEAR, ADDRESS, NUM_OF_CART } from "./constants";

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

const numOfCartState = {
    numOfCart :  localStorage.getItem("numOfCart") ? localStorage.getItem("numOfCart") : 0
}

export const numOfCartReducer = (state = numOfCartState, action) =>
{
    switch (action.type)
    {
        case NUM_OF_CART:{
            return {...state, numOfCart: action.payload}
        }
        case CLEAR:{
            return {
                numOfCart : 0
            }
        }
        default:{
            return state
        }
    }
}

