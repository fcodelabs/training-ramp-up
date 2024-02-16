import bycrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  try {
    const hash = await bycrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error("Error occurred while hashing password: %s", error);
  }
}

export async function checkPassword(
  hash: string,
  password: string,
): Promise<boolean> {
  try {
    const result = await bycrypt.compare(password, hash);
    return result;
  } catch (error) {
    console.error("Error occurred while checking password: %s", error);
  }
}
