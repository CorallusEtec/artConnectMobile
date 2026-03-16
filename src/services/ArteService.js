import config from "./config"

export default class ArteService {

    static async findAll() {
        try {
            const data = await fetch(`${config.apiUrl}/arte/todos`);
            return data.json();
        } catch (erro) {
        
        }
    }
}