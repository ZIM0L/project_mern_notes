export interface IUser {
    username?: string,
    email?: string,
    password?: string
}
export interface LoginBody {
    username?: string,
    password?: string
}
export interface findUserBody { 
    id?: string
}