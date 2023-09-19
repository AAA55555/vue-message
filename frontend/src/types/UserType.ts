export type UserType = {
  email: string
  password: string
}

export type CreateUserType = UserType & {
  role?: string
}
