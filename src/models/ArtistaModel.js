import UsuarioModel from './UsuarioModel';

export default class ArtistaModel extends UsuarioModel {
    constructor(data) {
        super(data);
        if(data == null) {
            this.cpf = "";
            this.dataNasc = new Date(2000,0,1);
            this.sexo = "",
            this.idArte = 1
        } else {
            this.cpf = data.cpf;
            this.dataNasc = data.dataNasc;
            this.sexo = data.sexo;
            this.idArte = data.idArte;
        }
        
    }
}