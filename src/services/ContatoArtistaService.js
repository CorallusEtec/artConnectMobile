import AsyncStorage from '@react-native-async-storage/async-storage'
import config from './config';
export default class ContatoArtistaService {

static async criarContato(id, contatoData) {

    try {

    const userString = await AsyncStorage.getItem('@login');
    const user = JSON.parse(userString);
    const userId = user.id;

    const response = await fetch(`${config.apiUrl}/artista/criar-contato/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contatoData)
    });

    if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || "Erro ao criar contato");
        }
        const data = await response.text();
        return data;

    } catch(error) {
        console.error("Não foi possivel criar contato",error);
        throw error;
    }

    }

    static async buscarContato() {
        try {

            const userString = await AsyncStorage.getItem('@login');
            const user = JSON.parse(userString);
            const userId = user.id;
            const response = await fetch(`${config.apiUrl}/artista/${userId}/todos`);

            if (!response.ok) {
                throw new Error("Erro ao buscar contatos");
            }
            return await response.json();
        } catch (error) {
            console.error("Erro ao buscar contatos:", error);
            throw error;
        }
    }

    static async deletarContato(id) {
        try {
            const response = await fetch(`${config.apiUrl}/artista/deletar-contato/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error("Erro ao deletar contato");
            }
            return await response.text();
        } catch (error) {
            console.error("Erro ao deletar contato", error);
        }
    }

    static async alterarContato(id, contatoData) {
        try {
            const userString = await AsyncStorage.getItem('@login');
            const user = JSON.parse(userString);
            const idArtista = user.id;

            const response = await fetch(`${config.apiUrl}/artista/alterar-contato/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    valorContatoArtista: contatoData.valorContatoArtista,
                    idTipoContato: contatoData.idTipoContato,
                    idArtista: idArtista
                })
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Erro ao alterar contato");
            }

            return await response.text();
        } catch (error) {
            console.error("Erro ao alterar contato", error);
            throw error;
        }
    }

}