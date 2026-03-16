export class ErroValidacao {
    constructor() {
        this.valido = true;
        this.msg = "";
    }

    invalido(msg) {
        this.valido = false;
        this.msg = msg;
        return this;
    }
}