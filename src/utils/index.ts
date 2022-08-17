/**
 * utils/index.ts
 * */

import jwt from "jsonwebtoken";

export const generateJwt = (id: number, email: string, role: number, time: string): string => {
  return jwt.sign(
    {id, email, role},
    String(process.env.SECRET_KEY),
    {
      expiresIn: time,
    }
  );
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(email);
};