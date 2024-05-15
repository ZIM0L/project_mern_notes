export interface User {
    username: string,
    email: string
}

export interface SignUpWithCredentials{
    username: string,
    email: string,
    password: string
}

export interface LoginCredentials { 
    username: string,
    password: string
}