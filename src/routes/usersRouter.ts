/**
 * userRouter.ts
 * */

import express from "express";
import {authAdminMiddleware, authBossMiddleware, authMiddleware} from "../middlewares/authMiddleware";

const router = express.Router();
router
  .route('/all')
  .get(authMiddleware, () => {
    console.log("get all users by your role");
  });

router
  .route("/:id")
  .post(authAdminMiddleware, () => {
    console.log("add user");
  })
  .get(authAdminMiddleware, () => {
    console.log("get user info");
  })
  .put(authAdminMiddleware, () => {
    console.log("change info");
  })
  .delete(authAdminMiddleware, () => {
    console.log("delete user");
  });

router
  .route("/change-boss")
  .post(authBossMiddleware, () => {
    console.log("change boss");
  });
export default router;
