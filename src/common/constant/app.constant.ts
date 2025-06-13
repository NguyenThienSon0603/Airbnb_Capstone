import 'dotenv/config';

export const DATABASE_URL = process.env.DATABASE_URL;
export const PORT = process.env.PORT;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPRIRES = process.env.ACCESS_TOKEN_EXPRIRES;

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPRIRES = process.env.REFRESH_TOKEN_EXPRIRES;

console.log({
  PORT,
  DATABASE_URL,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPRIRES,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPRIRES,
});
