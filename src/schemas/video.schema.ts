import { z } from "zod";

export const CreateVideoInputSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: "Title is required" })
      .min(1, "Title is required"),
    type: z.enum(["regular", "children_movie", "new_release"]),
    maxAge: z.number().min(1, "Maximum age is required").optional(),
    yearReleased: z.number().min(1, "Year released is required").optional(),
    genre: z.enum(["action", "drama", "romance", "comedy", "horror"]),
    regPrice: z.number().min(1, "Regular price is required").optional(),
    cdmPrice: z
      .number()
      .min(1, "Children's movie price is required")
      .optional(),
    nwrPrice: z.number().min(1, "New released price is required").optional(),
  }),
});

export const RentVideoInputSchema = z.object({
  body: z.object({
    noOfDays: z.number().min(1, "No of days is required"),
  }),
});

export type CreateVideoInputType = z.infer<typeof CreateVideoInputSchema>;
export type RentVideoInputType = z.infer<typeof RentVideoInputSchema>;
