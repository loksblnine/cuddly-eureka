/**
 * validationMiddleware.ts
 * */

import {NextFunction, Request, Response} from "express";
import {IValidationError} from "../types";
import {validateEmail} from "../utils";

export const validationMiddleware = (request: Request, response: Response, next: NextFunction): Response | undefined => {
  try {
    const email = String(request.body.email),
      role = Number(request.body.role),
      password = String(request.body.password);

    const errors: IValidationError = {};
    if (!email) {
      errors.email = "Email is required.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }
    if (!role) {
      errors.role = "Role is required.";
    }
    if (!validateEmail(email)) {
      errors.email = "Use valid email.";
    }
    if (password.length <= 8) {
      errors.password = "Password length should be greater than 8.";
    }
    if (role < 1 || role > 3) {
      errors.role = "Use roles numbers. 2 for Boss, 3 for Regular user.";
    } else {
      if (role === 1) {
        errors.role = "Only admin can register new admins.";
      }
    }
    if (Object.getOwnPropertyNames(errors).length === 0) {
      next()
    } else {
      return response.status(403).json({message: "Forbidden", ...errors});
    }
  } catch (e) {
    return response.status(403).json({message: "Forbidden"});
  }
};
