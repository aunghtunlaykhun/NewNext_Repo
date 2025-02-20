import z from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please provide a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long" })
    .max(100, { message: "Password must be less than 100 characters long" }),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be atleast 5 characters long" })
    .max(30, { message: "Username must be less than 30 characters long" }),
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be less than 50 characters long" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces",
    }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please provide a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long" })
    .max(100, { message: "Password must be less than 100 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title is required" })
    .max(100, { message: "Title cannot exceed 100 characters" }),
  content: z.string().min(1, { message: "Content is required" }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: "Tag is required" })
        .max(30, { message: "Tag cannot exceed 30 characters" })
    )
    .min(1, { message: "At least one tag is required" })
    .max(3, { message: "cannot add more than 3 tags" }),
});

export const UserSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 3 characters long" }),
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters long" }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  bio: z.string().optional(),
  image: z
    .string()
    .url({ message: "Please provide a valid image url" })
    .optional(),
  location: z.string().optional(),
  portfolio: z
    .string()
    .url({ message: "Please provide a valid portfolio url" })
    .optional(),
  reputation: z.number().optional(),
});
