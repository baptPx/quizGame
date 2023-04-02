import { IUser } from "../../models/IUser";

export {}

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}
