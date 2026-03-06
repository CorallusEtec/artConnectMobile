import { create } from 'zustand';

const useStore = create((set) => ({
    usuario: {},
    alter: (novoUsuario) => set((state) => ({ usuario: novoUsuario })),
    logout: () => set((state) => ({usuario: {} }))
}));

export default useStore;