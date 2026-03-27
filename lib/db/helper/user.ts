import type { User } from "../../../types/user.ts";
import { modify, select } from "../mysql.ts";

export async function createUser(user: User): Promise<User> {
  const res = await modify(
    "INSERT INTO users(email, password, role, subscription) VALUES (?, ?, ?, ?);",
    [user.email, user.password, user.role, user.subscription],
  );

  return user;
}

export async function getUserByID(id: string): Promise<User> {
  const user = await select<User>("SELECT * FROM users WHERE id = ?", [id]);
  return user[0];
}
