export const selectAddressReducer = (state) =>
{
    return state.addressReducer
}

export const addressPackageSelector = (state) =>
{
    return selectAddressReducer(state).address
}