/**
 * validationMiddleware.ts
 * */

import {NextFunction, Request, Response} from "express";
import {IValidationError} from "../types";
import {validateEmail} from "../utils";
import {User, UserToUser} from "../database/models";
import {Op} from "sequelize";

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
      if (role === 1 && request.body?.user?.role !== 1) {
        errors.role = "Only admin can register new admins.";
      }
    }
    if (Object.getOwnPropertyNames(errors).length === 0) {
      next();
    } else {
      return response.status(403).json({message: "Forbidden", ...errors});
    }
  } catch (e) {
    return response.status(403).json({message: "Forbidden"});
  }
};

export const validationUserToUserMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  const regularId = Number(request.body.regularId) || -1;
  const newBossId = Number(request.body.newBossId) || -1;
  const bossId = Number(request.body.user.id) || -1;
  if (regularId === bossId || bossId === newBossId || regularId === newBossId) {
    return response.status(412).json(
      "Check the provided info. Maybe you miss something."
    );
  }
  const boss = await User.findOne({
    where: {
      role: {[Op.or]: [2, 3]},
      id: bossId
    },
    raw: true,
  });
  if (!boss) {
    return response.status(412).json(
      "This is not boss user."
    );
  }
  const regular = await User.findOne({
    where: {
      role: {[Op.or]: [2, 3]},
      id: regularId
    },
    raw: true,
  });
  if (!regular) {
    return response.status(412).json(
      "This user can not obey."
    );
  }
  if (newBossId > 0) {
    const newBoss = await User.findOne({
      where: {
        role: 2,
        id: newBossId
      },
      raw: true,
    });
    if (!newBoss) {
      return response.status(412).json(
        "This is not boss user."
      );
    }
    const contact = await UserToUser.findOne({
      attributes: ["bossId", "regularId"],
      where: {
        bossId,
        regularId
      },
      raw: true,
    });
    if (!contact) {
      return response.status(412).json(
        "This is not ur regular user."
      );
    }
  }
  return next();
};