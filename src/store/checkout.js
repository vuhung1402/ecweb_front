import { create } from "zustand";

const initialState = {
    order: {},
    address: {},
    expiredAtVoucherDiscount:0,
    expiredAtVoucherShipping:0,
    codeVoucherDiscount: '',
    codeVoucherShipping: ''
}

const useCheckoutStore = create((set) => ({
    ...initialState,
    setOrder: (order) => set({ order }),
    setAddress: (address) => set({ address }),
    setCodeVoucherDiscount: (codeVoucherDiscount) => set({ codeVoucherDiscount }),
    setCodeVoucherShipping: (codeVoucherShipping) => set({ codeVoucherShipping }),
    setExpiredAtVoucherDiscount: (expiredAtVoucherDiscount) => set({ expiredAtVoucherDiscount }),
    setExpiredAtVoucherShipping: (expiredAtVoucherShipping) => set({ expiredAtVoucherShipping }),
    clear: () => set({...initialState})
}))

export default useCheckoutStore