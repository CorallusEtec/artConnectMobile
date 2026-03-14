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
                body: JSON.stringify(artista),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST'
            });
            console.log(data.status)
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

    static async alterarUsuario(dadosUsuario) {
        try{
            const userString = await AsyncStorage.getItem('@login');
            if (!userString) {
                throw new Error ("Usuario não encontrado")
            }

            const user = JSON.parse(userString);
            const id = user.id;
            const response = await fetch(`${config.apiUrl}/artista/alterar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,  
                    nome: dadosUsuario.nome,   
                    bairro: dadosUsuario.bairro,
                    cep: dadosUsuario.cep,
                    cidade: dadosUsuario.cidade,
                    complemento: dadosUsuario.complemento,
                    nomeLog: dadosUsuario.nomeLog,
                    numLog: dadosUsuario.numLog,
                    tipoLog: dadosUsuario.tipoLog,
                    estado: dadosUsuario.estado
                })
        });

        const data = await response.text();

        if(!response.ok) {
            throw new Error(data || "Erro ao alterar");
        }
        return data
    } catch(error) {
        console.error("Erro ao alterar usuario:",error);
    }
    }

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