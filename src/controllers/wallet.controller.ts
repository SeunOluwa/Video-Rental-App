import { Request, Response } from "express";
import prisma from "../services/prisma";
import {
  FundWalletInputType,
  WithdrawFromWalletInputType,
  ConvertNairaToDollarInputType,
} from "../schemas/wallet.schema";
import { NotFound, BadRequest } from "../utils/custom-errors";
import { JWTUser } from "../services/jwt";

export const createWallet = async (
  req: Request,
  res: Response<any, JWTUser>
) => {
  const { id } = res.locals.user;
  const user = await prisma.user.findUnique({
    where: { id },
    include: { wallets: true },
  });
  if (!user) {
    throw new NotFound("User does not exists");
  }
  if (user.wallets.length > 0) {
    throw new BadRequest("User already has wallets");
  }

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      wallets: {
        createMany: {
          data: [
            { balance: 0, currency: "NGN" },
            { balance: 0, currency: "USD" },
          ],
        },
      },
    },
    select: { wallets: true },
  });

  return res.status(201).json({ message: "Wallets created successfully." });
};

export const fundWallet = async (
  req: Request<{}, {}, FundWalletInputType["body"]>,
  res: Response<any, JWTUser>
) => {
  const { amount } = req.body;
  const { id } = res.locals.user;
  const user = await prisma.user.findUnique({
    where: { id },
    include: { wallets: true },
  });
  if (!user) {
    throw new NotFound("User does not exists");
  }
  const nairaWallet = user?.wallets.find((wallet) => {
    return wallet.currency === "NGN";
  });
  if (!nairaWallet) {
    throw new BadRequest("User does not own a Naira wallet");
  }

  const balanceIncrement = amount * 100;

  const fundedWallet = await prisma.wallet.update({
    where: {
      userId_currency: { currency: "NGN", userId: user.id },
    },
    data: {
      balance: { increment: balanceIncrement },
    },
  });

  res.status(201).json({ balance: Number(fundedWallet.balance) });
};

export const withdrawFromWallet = async (
  req: Request<{}, {}, WithdrawFromWalletInputType["body"]>,
  res: Response<any, JWTUser>
) => {
  const { amount } = req.body;
  const { id } = res.locals.user;
  const user = await prisma.user.findUnique({
    where: { id },
    include: { wallets: true },
  });
  if (!user) {
    throw new NotFound("User does not exists");
  }
  const nairaWallet = user?.wallets.find((wallet) => {
    return wallet.currency === "NGN";
  });
  if (!nairaWallet) {
    throw new BadRequest("User does not own a Naira wallet");
  }

  const balanceDecrement = amount * 100;

  const withdrawnWallet = await prisma.wallet.update({
    where: {
      userId_currency: { currency: "NGN", userId: user.id },
    },
    data: {
      balance: { decrement: balanceDecrement },
    },
  });

  res.status(201).json({ balance: Number(withdrawnWallet.balance) });
};

export const convertNairaToDollar = async (
  req: Request<{}, {}, ConvertNairaToDollarInputType["body"]>,
  res: Response<any, JWTUser>
) => {
  const { amount } = req.body;
  const { id } = res.locals.user;
  const user = await prisma.user.findUnique({
    where: { id },
    include: { wallets: true },
  });
  if (!user) {
    throw new NotFound("User does not exists");
  }
  const nairaWallet = user?.wallets.find((wallet) => {
    return wallet.currency === "NGN";
  });
  if (!nairaWallet) {
    throw new BadRequest("User does not own a Naira wallet");
  }

  const dollar = Math.round(amount / 700);
  const balanceDecrement = amount * 100;
  const balanceIncrement = dollar * 100;

  if (nairaWallet.balance < balanceDecrement) {
    throw new BadRequest("Insufficient funds");
  }

  const [ngnWallet, usdWallet] = await Promise.all([
    prisma.wallet.update({
      where: {
        userId_currency: { currency: "NGN", userId: user.id },
      },
      data: {
        balance: { decrement: balanceDecrement },
      },
    }),
    prisma.wallet.update({
      where: {
        userId_currency: { currency: "USD", userId: user.id },
      },
      data: {
        balance: { increment: balanceIncrement },
      },
    }),
  ]);

  res.status(201).json({
    ngnBalance: Number(ngnWallet.balance),
    usdBalance: Number(usdWallet.balance),
  });
};
