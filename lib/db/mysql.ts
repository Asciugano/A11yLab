import mysql, { ResultSetHeader } from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,

  waitForConnections: true,
  queueLimit: 0,
});

type QueryParams = Array<string | number | boolean | null>;

export async function select<T>(
  sql: string,
  params?: QueryParams,
): Promise<Partial<T>[]> {
  const [res] = await db.execute(sql, params);
  return res as T[];
}

export async function modify(
  sql: string,
  params?: QueryParams,
): Promise<ResultSetHeader> {
  const [res] = await db.query(sql, params);
  return res as ResultSetHeader;
}
