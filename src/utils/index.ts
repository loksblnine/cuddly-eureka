import jwt from "jsonwebtoken"

export const generateJwt = (id: number, email: string, role: number, time: string): string => {
  return jwt.sign(
    {id, email, role},
    String(process.env.SECRET_KEY),
    {
      expiresIn: time,
    }
  );
}