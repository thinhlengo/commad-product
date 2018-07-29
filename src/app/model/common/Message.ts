export class Message {
    id:number;
    message:string;
    constructor(id?:number, message?:string) {
        this.id = 1;
        this.message = 'Action was success!';
        if (id) this.id = id;
        if (message) this.message = message;
    }
}
