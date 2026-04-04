import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function generateToken(userID: string) {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return token;
}

export async function getUserIdFromToken() {
  const token = (await cookies()).get("jwt")?.value;

  if (!token) return null;

  try {
    // verifica e estrazionde (dell'userID) dal jwt
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userID: string;
    };
    return decoded.userID;
  } catch (e) {
    // in caso di errore rimozione del token
    console.error(e);
    return null;
  }
}
