import { Types,Schema, model, models } from "mongoose";

interface IQuestion {
    author:Types.ObjectId;
    title:string;
    content:string;
    tags:Types.ObjectId[];
    answers:number;
    upvote:number,
    downvote:number,
    views:number
}


const QuestionSchema = new Schema<IQuestion>({
    author:{type:Schema.Types.ObjectId,ref:'User',required:true},
    title:{type:String,required:true},
    content:{type:String,required:true},
    tags:{type:[{type:Schema.Types.ObjectId,ref:'Tag'}],required:true},
    answers:{type:Number,default:0},
    upvote:{type:Number,default:0},
    downvote:{type:Number,default:0},
    views:{type:Number,default:0}


},{timestamps:true})

const Question = models.Question || model<IQuestion>('Question',QuestionSchema);

export default Question;