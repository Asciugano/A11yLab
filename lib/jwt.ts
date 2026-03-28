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
