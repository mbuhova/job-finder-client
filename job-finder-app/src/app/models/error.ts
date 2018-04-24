export class Error {
    message: string;
    detail: string;
    statusCode: number;

    constructor(message: string, detail: string, statusCode: number){
        this.message = message;
        this.detail = detail;
        this.statusCode = statusCode;
    }
}