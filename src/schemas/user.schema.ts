import { z } from "zod";

export const CreateUserInputSchema = z.object({
  body: z
    .object({
      firstName: z
        .string({ required_error: "Firstname is required" })
        .min(1, "Firstname is required"),
      lastName: z
        .string({ required_error: "Lastname is required" })
        .min(1, "Lastname is required"),
      email: z
        .string({ required_error: "Email is required" })
        .email("Email is not valid"),
      password: z
        .string({ required_error: "Password is required" })
        .min(8, "Password cannot be less than 8 characters"),
      confirmPassword: z.string({
        required_error: "Confirm password is required",
      }),
    })
    .refine(
      (data) => {
        return data.password === data.confirmPassword;
      },
      {
        message: "Confirm password does not match password",
        path: ["confirmPassword"],
      }
    ),
});

export type CreateUserInputType = z.infer<typeof CreateUserInputSchema>;
