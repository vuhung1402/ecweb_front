export const selectNumOfCartReducer = (state) =>
    {
        return state.numOfCartReducer
    }
    
    export const numOfCartPackageSelector = (state) =>
    {
        return selectNumOfCartReducer(state).numOfCart
    }