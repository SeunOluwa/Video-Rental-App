import { z } from "zod";

export const FundWalletSchema = z.object({
  body: z.object({
    amount: z.number().min(1, "Amount is required"),
  }),
});

export const WithdrawFromWalletSchema = z.object({
  body: z.object({
    amount: z.number().min(1, "Amount is required"),
  }),
});

export const ConvertNairaToDollarSchema = z.object({
  body: z.object({
    amount: z.number().min(1, "Amount is required"),
  }),
});

export type FundWalletInputType = z.infer<typeof FundWalletSchema>;
export type WithdrawFromWalletInputType = z.infer<
  typeof WithdrawFromWalletSchema
>;
export type ConvertNairaToDollarInputType = z.infer<
  typeof ConvertNairaToDollarSchema
>;
