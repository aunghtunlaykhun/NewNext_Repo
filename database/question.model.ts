import { Types, Schema, model, models, Document } from "mongoose";

interface IQuestion {
  author: Types.ObjectId;
  title: string;
  content: string;
  tags: Types.ObjectId[];
  answers: number;
  upvotes: number;
  downvotes: number;
  views: number;
}

export interface IQuestionDoc extends IQuestion, Document {}

const QuestionSchema = new Schema<IQuestion>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: {
      type: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
      required: true,
    },
    answers: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Question =
  models.Question || model<IQuestion>("Question", QuestionSchema);

export default Question;
