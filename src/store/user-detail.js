import { create } from 'zustand';

const initialState = {
    roles: [],
    initialRole: [],
    isGrantRole: true,
}

const useUserDetailStore = create((set) => ({
    ...initialState,
    setRoles: (roles) => set(
        { 
            roles:roles 
        }
    ),
    setInitialRole: (roles) => set(
        {
            initialRole: roles,
        }
    ),
    setIsGrantRole: (isGrantRole) => set(
        {
            isGrantRole: isGrantRole
        }
    ),
    clear: () => set({ ...initialState })
}));

export default useUserDetailStore