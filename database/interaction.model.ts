import { model, models, Schema, Types } from "mongoose";

export interface IInteraction {
  user: Types.ObjectId;
  action: string;
  actionId: Types.ObjectId;
  actionType: "questioin" | "answer";
}

const InteractionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  actionId: { type: Schema.Types.ObjectId, required: true },
  actionType: { type: String, enum: ["question", "answer"], required: true },
});
const Interaction =
  models.Interaction || model("Interaction", InteractionSchema);

export default Interaction;
