/**
 * authMiddleware.ts
 * */

import jwt, {JwtPayload} from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";

export const authAdminMiddleware = (request: Request, response: Response, next: NextFunction): Response | undefined => {
  try {
    const token = String(request?.headers?.authorization?.split(' ')[1]);
    if (!token) {
      return response.status(401).json({message: "Unauthorised"});
    }
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY)) as JwtPayload;
    console.log(11234, decoded);
    if (decoded?.role === 1) {
      request.body.user = decoded;
      next();
    } else {
      return response.status(403).json({message: "Forbidden"});
    }
  } catch (e) {
    return response.status(403).json({message: "Forbidden"});
  }
};

export const authMiddleware = (request: Request, response: Response, next: NextFunction): Response | undefined => {
  try {
    const token = String(request?.headers?.authorization?.split(' ')[1]);
    if (!token) {
      return response.status(401).json({message: "Unauthorised"});
    }
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY)) as JwtPayload;
    if (decoded?.role) {
      request.body.user = decoded;
      next();
    } else {
      return response.status(403).json({message: "Forbidden"});
    }
  } catch (e) {
    return response.status(403).json({message: "Forbidden"});
  }
};

export const authBossMiddleware = (request: Request, response: Response, next: NextFunction): Response | undefined => {
  try {
    const token = String(request?.headers?.authorization?.split(' ')[1]);
    if (!token) {
      return response.status(401).json({message: "Unauthorised"});
    }
    const decoded = jwt.verify(token, String(process.env.SECRET_KEY)) as JwtPayload;
    if (decoded?.role === 2) {
      request.body.user = decoded;
      next();
    } else {
      return response.status(403).json({message: "Forbidden"});
    }
  } catch (e) {
    return response.status(403).json({message: "Forbidden"});
  }
};
