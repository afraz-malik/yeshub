export interface IRole {
    role_id: number
}

export default interface IUser {
    id: number
    email: string
    name: string
    email_verified_at?: Date
    remember_token: string
    created_at: Date
    updated_at?: Date
    role: IRole
}
