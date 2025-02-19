import { model, models, Schema, Types } from "mongoose";

export interface IAnswer {
    content:string;
    question:Types.ObjectId;
    author:Types.ObjectId;
    upvotes:number;
    downvotes:number;
}
const AnswerSchema = new Schema<IAnswer>({
    content:{type:String,required:true},
    question:{type:Schema.Types.ObjectId,ref:'Question',required:true},
    author:{type:Schema.Types.ObjectId,ref:'User',required:true},
    upvotes:{type:Number,required:true},
    downvotes:{type:Number,required:true}
},{timestamps:true})

const Answer = models.Answer || model('Answer',AnswerSchema);

export default Answer;