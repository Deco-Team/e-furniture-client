export interface ILoginActionPayload {
  email: string
  password: string
}

export interface IGoogleLoginActionPayload {
  credential: string
}

export interface ILoginActionData {
  accessToken: string
  refreshToken: string
}

export interface IRegisterActionPayload {
  firstName: string
  lastName: string
  email: string
  password: string
}
