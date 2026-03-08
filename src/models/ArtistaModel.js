import UsuarioModel from './UsuarioModel';

export default class ArtistaModel extends UsuarioModel {
    constructor(data) {
        super(data);
        this.id = data.id;
        this.cpfArtista = data.cpfArtista;
        this.dataNascArtista = data.dataNascArtista;
        this.sexoArtista = data.sexoArtista;
        this.telefoneArtista = data.telefoneArtista;
    }
}