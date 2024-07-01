

export class AppError extends Error{
    constructor(messsage,statusCode){
        super(messsage);
        this.statusCode = statusCode;
    }
}