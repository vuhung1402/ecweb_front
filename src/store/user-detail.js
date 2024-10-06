import { create } from 'zustand';

const initialState = {
    roles: []
}

const useUserDetailStore = create((set) => ({
    ...initialState,
    setRoles: (roles) => set({ roles }),
    clear: () => set({ ...initialState })
}));

export default useUserDetailStore