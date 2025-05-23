import { InteractionActionEnums } from "@/database/interaction.model";
import { join } from "path";
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

export const AccountSchema = z.object({
  userId: z.string().min(1, { message: "User Id is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  image: z.string().url({ message: "Please provide a valid image url" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one specal character",
    })
    .optional(),
  provider: z.string().min(1, { message: "Provider is required" }),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account Id is required" }),
});

export const SignInWithOauthSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider account Id is required" }),
  user: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" }),
    email: z
      .string()
      .email({ message: "Please provide a valid email address" }),
    image: z.string().url("Invalid Image Url").optional(),
  }),
});

export const EditQuestionSchema = AskQuestionSchema.extend({
  questionId: z.string().min(1, { message: "Question Id is required" }),
});

export const GetQuestionSchema = z.object({
  questionId: z.string().min(1, { message: "Question ID is required" }),
});

export const DeleteQuestionSchema = z.object({
  questionId: z.string().min(1, { message: "Question id is required" }),
});

export const PaginatedSearchParamsSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(10),
  query: z.string().optional(),
  filter: z.string().optional(),
  sort: z.string().optional(),
});

export const GetTagQuestionsSchema = PaginatedSearchParamsSchema.extend({
  tagId: z.string().min(1, { message: "Tag Id is required" }),
});

export const IncrementViewsSchema = z.object({
  questionId: z.string().min(1, { message: "Question Id is required" }),
});

export const AnswerSchema = z.object({
  content: z
    .string()
    .min(100, { message: "Answer has to have more than 100 characters" }),
});

export const DeleteAnswerSchema = z.object({
  answerId: z.string().min(1, { message: "Answer Id is required" }),
});

export const AnswerServerSchema = AnswerSchema.extend({
  questionId: z.string().min(1, { message: "Question ID is required" }),
});

export const GetAnswersSchema = PaginatedSearchParamsSchema.extend({
  questionId: z.string().min(1, { message: "Question ID is required" }),
});

export const AIAnswerSchema = z.object({
  question: z
    .string()
    .min(5, { message: "Question is required" })
    .max(130, { message: "Question cannnot exceed 130 characters" }),
  content: z
    .string()
    .min(100, { message: "Answer has to be more than 100 characters" }),
  userAnswer: z.string().optional(),
});

export const CreateVoteSchema = z.object({
  targetId: z.string().min(1, { message: "Target ID is required" }),
  targetType: z.enum(["question", "answer"], {
    message: "Invalid target type",
  }),
  voteType: z.enum(["upvote", "downvote"], { message: "Invalid vote type" }),
});

export const UpdateVoteCountSchema = CreateVoteSchema.extend({
  change: z.number().int().min(-1).max(1),
});

export const HasVotedSchema = CreateVoteSchema.pick({
  targetId: true,
  targetType: true,
});

export const CollectionBaseSchema = z.object({
  questionId: z.string().min(1, { message: "Question ID is required" }),
});

export const GetUserSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
});

export const GetUserQuestionSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, { message: "User ID is required" }),
});

export const GetUserAnswersSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, { message: "User ID is required" }),
});

export const GetUserTagSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
});

export const CreateInteractionSchema = z.object({
  action: z.enum(InteractionActionEnums),
  actionTarget: z.enum(["question", "answer"]),
  actionId: z.string().min(1, { message: "Action Id is required" }),
  authorId: z.string().min(1, { message: "Author Id is required" }),
});
