export interface Product {
    idProduct : number,
    name : string,
    price : number,
    image_path : string
}

export interface newUser {
    userId : number,
    firstname : String,
    lastname : String,
    email : String,
    password : String
}

export interface User {
    userId : number,
    firstname : String,
    lastname : String,
    email : String,
    role : String
}