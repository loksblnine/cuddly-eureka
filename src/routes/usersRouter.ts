/**
 * userRouter.ts
 * */

import express from "express";
import {authAdminMiddleware, authBossMiddleware, authMiddleware} from "../middlewares/authMiddleware";
import {validationMiddleware} from "../middlewares/validationMiddleware";
import {createUser, deleteUserById, getAllUsers, getUserById, updateUser} from "../controllers/usersController";

const router = express.Router();
router
  .route('/all')
  .get(authMiddleware, getAllUsers);

router
  .route("/")
  .post(authAdminMiddleware, validationMiddleware, createUser)

router
  .route("/:id")
  .get(authAdminMiddleware, getUserById)
  .put(authAdminMiddleware, validationMiddleware, updateUser)
  .delete(authAdminMiddleware, deleteUserById);

router
  .route("/change-boss")
  .post(authBossMiddleware, () => {
    console.log("change boss");
  });
export default router;
