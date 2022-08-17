/**
 * authRouter.ts
 * */

import express from "express";
import * as AuthController from "../controllers/authController";
import {validationMiddleware} from "../middlewares/validationMiddleware";

const router = express.Router();
router
  .route('/register')
  .post(validationMiddleware, AuthController.registerUser);
router
  .route("/login")
  .post(AuthController.loginUser);

export default router;
