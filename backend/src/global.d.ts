// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SessionData } from "express-session";

declare module "express-session" {
  interface SessionData {
    userEmail: string;
    role: string;
  }
}

declare module "express-serve-static-core" {
  interface Request {
    session: Express.Session & {
      userEmail?: string;
      role?: string;
    };
  }
}
