export class GlobalService {
    static emailPattern = /([a-z0-9]{2,})\@([a-z0-9]{2,})\.([a-z0-9]{2,})(\.([a-z0-9]{2,}))?/g;
    
    static cepPattern = /([0-9]{5})\-([0-9]{3})/g;

    // maior ou igual a 6 char;
    static senhaPattern = /[\S]{6,}/g;
}