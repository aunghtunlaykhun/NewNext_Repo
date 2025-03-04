import { model, models, Schema, Types, Document } from "mongoose";

export interface IAnswer {
  content: string;
  question: Types.ObjectId;
  author: Types.ObjectId;
  upvotes: number;
  downvotes: number;
}
export interface IAnswerDoc extends IAnswer, Document {}
const AnswerSchema = new Schema<IAnswer>(
  {
    content: { type: String, required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Answer = models.Answer || model<IAnswer>("Answer", AnswerSchema);

export default Answer;
