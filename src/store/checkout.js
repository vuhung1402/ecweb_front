import { create } from "zustand";

const initialState = {
    order: {},
    address: {},
    codeVoucherDiscount: '',
    codeVoucherShipping: ''
}

const useCheckoutStore = create((set) => ({
    ...initialState,
    setOrder: (order) => set({ order }),
    setAddress: (address) => set({ address }),
    setCodeVoucherDiscount: (codeVoucherDiscount) => set({ codeVoucherDiscount }),
    setCodeVoucherShipping: (codeVoucherShipping) => set({ codeVoucherShipping }),
    clear: () => set({...initialState})
}))

export default useCheckoutStore