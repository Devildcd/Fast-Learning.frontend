
export interface AuthResponse {
    status: number,
    user?: Usuario['user'],
    access_token: string
    msg?: string
}

export interface Usuario {
    user: {
      id?: number;
      name?: string;
      email?: string;
      password?: string;
    };
  }