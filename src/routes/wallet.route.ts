import express from "express";
import {
  convertNairaToDollar,
  createWallet,
  fundWallet,
  withdrawFromWallet,
} from "../controllers/wallet.controller";
import {
  ConvertNairaToDollarSchema,
  FundWalletSchema,
  WithdrawFromWalletSchema,
} from "../schemas/wallet.schema";
import { validateInput } from "../middlewares/input-validator";

import { auth } from "../middlewares/auth-handler";

const router = express.Router();

router.post("/", auth, createWallet);
router.post("/fund", auth, validateInput(FundWalletSchema), fundWallet);
router.post(
  "/withdraw",
  auth,
  validateInput(WithdrawFromWalletSchema),
  withdrawFromWallet
);
router.patch(
  "/convert",
  auth,
  validateInput(ConvertNairaToDollarSchema),
  convertNairaToDollar
);

export default router;
