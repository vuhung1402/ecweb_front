import { USER_PACKAGE, CLEAR } from "./actionTypes";

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