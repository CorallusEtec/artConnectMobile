import AsyncStorage from '@react-native-async-storage/async-storage'
import config from './config';
import { GlobalService } from './GlobalService';
import { ErroValidacao } from './ErroValidacao';
export class ArtistaService {
    static cpfPattern = /([0-9]{3})\.([0-9]{3})\.([0-9]{3})\-([0-9]{2})/g
    /* 
     * VALIDAÇÕES 
     */
    
    static validarCampos(artista, senhaConfirm, campos) {
        const valido = new ErroValidacao("");
        for(let i=0; i<campos.length; i++) {
            if(typeof artista[campos[i]] == 'string') {
                if(artista[campos[i]].trim() == "") {
                    return valido.invalido("Há Campos não preenchidos");
                }

                if(campos[i] == 'senha') {
                    if(artista[campos[i]].trim().length < 6) {
                        return valido.invalido("A senha deve conter no mínimo 6 caracteres");
                    }
                    if(senhaConfirm != undefined) {
                        if(senhaConfirm.trim() != artista[campos[i]].trim()) {
                            return valido.invalido("As senhas não se conhecidem");
                        }
                    }
                } else if(campos[i] == 'email') {
                    if(GlobalService.emailPattern.test(artista[campos[i]].trim()) == false) {
                        if(GlobalService.emailPattern.test(artista[campos[i]].trim()) == false) {
                            return valido.invalido("Insira um endereço de email válido")
                        }
                    }
                } else if(campos[i] == 'cpf') {
                    if(ArtistaService.cpfPattern.test(artista[campos[i]]) == false) {
                        if(ArtistaService.cpfPattern.test(artista[campos[i]]) == false) {
                            return valido.invalido("Insira um CPF válido");
                        }
                    }
                } else if(campos[i] == 'cep') {
                    if(GlobalService.cepPattern.test(artista[campos[i]]) == false) {
                        if(GlobalService.cepPattern.test(artista[campos[i]]) == false) {
                            return valido.invalido("Digite um CEP válido");
                        }
                    }
                } 
            } else if(typeof artista[campos[i]] == 'object') {
                if(campos[i] == 'dataNasc') {
                    const hoje = new Date();
                    const nascimento = artista[campos[i]];
                    
                    // Calcula a diferença de idade
                    let idade = hoje.getFullYear() - nascimento.getFullYear();
                    const mes = hoje.getMonth() - nascimento.getMonth();
                    
                    // Ajusta se o aniversário ainda não ocorreu este ano
                    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
                        idade--;
                    }
                    if(idade<18) {
                        return valido.invalido("O artista deve ser maior de idade");
                    }
                }
            
            } else if(typeof artista[campos[i]] == 'number') {
                if(campos[i] == 'numLog') {
                    if(artista[campos[i]] == 0) {
                        return valido.invalido("Insira o número do endereço")
                    }
                }
            }
        }
        return valido;
    }
    
    static validarLogin(campos) {
        const valido = new ErroValidacao("");
        for(let i=0; i<campos.length; i++) {
            if(campos[i].trim() == "") {
                return valido.invalido("Há Campos não preenchidos");
            }
        }
        return valido;
    }
    
    
    /*
     * CRUDS
     */
    static async login(email, senha) {
        try {
            const data = await fetch(`${config.apiUrl}/login/logar?email=${email}&senha=${senha}`);
            return data.json();
        } catch(erro) {
            return new ErroValidacao().invalido("Não foi possivel fazer login");
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