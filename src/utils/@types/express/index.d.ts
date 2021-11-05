declare namespace Express {
  export interface Request {
      playerId: string;
      admin: boolean;
      userId: string;
  }
}
