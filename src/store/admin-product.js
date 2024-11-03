import { create } from 'zustand';

const initialState = {
    categoryId:'',
    activeKey:'',
    modalType: '',
    deleteTab:'',
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
    clear: () => set({ ...initialState })
}));

export default useAdminProductStore