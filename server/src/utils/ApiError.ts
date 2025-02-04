export class ApiError extends Error{
    constructor(public statusCode : number,public message: string){
      super(message);
      Object.setPrototypeOf(this,ApiError.prototype); 
    }

    serialize(){
        return {
            status : this.statusCode,
            message : this.message
        }
    } 
}
