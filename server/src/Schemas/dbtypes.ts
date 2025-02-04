export interface product{
    name :string,
    category:string,
    price:number,
    stock:number,
}

export interface user{
    name :string,
    role : "admin"|"non-admin",
}