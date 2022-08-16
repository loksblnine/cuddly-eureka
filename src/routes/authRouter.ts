/**
 * authRouter.ts
 * */

import express from "express";

const router = express.Router();
router
  .route('/register')
  .post(() => {
    console.log("register router");
  })
router
  .route("/login")
  .post(() => {
    console.log("post route");
  })

export default router
