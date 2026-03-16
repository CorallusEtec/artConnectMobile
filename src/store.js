import { create } from 'zustand';

const useStore = create((set) => ({
    usuario: null,
    alter: (novoUsuario) => set(() => ({ usuario: novoUsuario })),
    logout: () => set(() => ({usuario: null }))
}));

export default useStore;