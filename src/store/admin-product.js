import { voucherStatus, voucherType } from '@constants/index';
import { create } from 'zustand';

const initialState = {
    categoryId:'',
    activeKey:'',
    modalType: '',
    deleteTab:'',
    statusVoucher: voucherStatus.UNRELEASED,
    typeVoucher: '',
    isModalOpen: false,
}

const useAdminProductStore = create((set) => ({
    ...initialState,
    setCategoryId: (categoryId) => set({ categoryId }),
    setActiveKey: (activeKey) => set({ activeKey }),
    setModalType: (modalType) => set({modalType}),
    setDeleteTab: (deleteTab) => set({deleteTab}),
    setIsModalOpen: (isModalOpen) => set(
        { 
            isModalOpen: !isModalOpen 
        }
    ),
    setTypeVoucher: (typeVoucher) => set({typeVoucher}), 
    setStatusVoucher: (statusVoucher) => set({statusVoucher}),
    clear: () => set({ ...initialState })
}));

export default useAdminProductStore