import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  jwt_secret_key: String(process.env.JWT_SECRET_KEY),
};
