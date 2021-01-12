type TId = string;

interface IUserSession {
  token: string;
  name: string;
  role: string;
}

export const usersSession: Map<TId, IUserSession> = new Map();
