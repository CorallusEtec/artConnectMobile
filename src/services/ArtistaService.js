import AsyncStorage from '@react-native-async-storage/async-storage'
import config from './config';
export default class ArtistaService {

    static async login(email, senha) {
        try {
            const data = await fetch(`${config.apiUrl}/login/logar?email=${email}&senha=${senha}`);
            if(data.status == 302) {

            }
            return data.json();
        } catch(erro) {
            console.error('Erro ao buscar artistas:', erro);
        }
    }

    static async save(artista) {
        try {
            const data = await fetch(`${config.apiUrl}/artista/cadastro`,{
                body: artista,
                method: 'POST'
            });
            console.log(data.statusText)
        } catch(erro) {
            console.error('Erro ao buscar artistas:', erro);
        }
    }

    static async saveUserLocal(user) {
        await AsyncStorage.setItem('@login', JSON.stringify(user));
    }

    static async getUserLocal() {
        const user = await AsyncStorage.getItem('@login');
        if(user == null) {
            return null;
        } else {
            return JSON.parse(user);
        }
    }
}