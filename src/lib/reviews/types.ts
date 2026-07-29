import { z } from "zod";

export const ReviewSchema = z.object({
  id: z.string(),
  author: z.string(),
  rating: z.number().min(0).max(5),
  text: z.string(),
  relativeTime: z.string().optional(),
  date: z.string().optional(),
  location: z.string().optional(),
  source: z.enum(["google", "seed"]),
});

export type Review = z.infer<typeof ReviewSchema>;

export const ReviewsPayloadSchema = z.object({
  reviews: z.array(ReviewSchema),
  summary: z.object({
    average: z.number(),
    total: z.number(),
    source: z.string(),
  }),
});

export type ReviewsPayload = z.infer<typeof ReviewsPayloadSchema>;
