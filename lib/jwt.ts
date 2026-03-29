import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function generateToken(userID: string) {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  (await cookies()).set({
    name: "jwt",
    value: token,
    maxAge: 24 * 60 * 60,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NEXT_ENV !== "dev",
    path: "/",
  });

  return token;
}

export async function getUserIfFromToken() {
  const cookiesStore = cookies();
  const token = (await cookiesStore).get("jwt")?.value;

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
    const cookiesStore = cookies();
    (await cookiesStore).delete("jwt");
    return null;
  }
}
