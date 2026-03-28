import { create } from 'zustand';

const useStore = create((set) => ({
    usuario: Object,
    alter: (novoUsuario: Object) => set(() => ({ usuario: novoUsuario })),
    logout: () => set(() => ({usuario: null }))
}));

export default useStore;