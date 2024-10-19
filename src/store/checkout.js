import { create } from "zustand";

const initialState = {
    order: {},
    address: {},
}

const useCheckoutStore = create((set) => ({
    ...initialState,
    setOrder: (order) => set({ order }),
    setAddress: (address) => set({ address }),
    clear: () => set({...initialState})
}))

export default useCheckoutStore