import { create } from 'zustand';

const useStore = create((set) => ({
    usuario: {},
    alter: (novoUsuario) => set(() => ({ usuario: novoUsuario })),
    logout: () => set(() => ({usuario: {} }))
}));

export default useStore;