import db from "mongoose";

const PositionSchema = new db.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    position_head: {
      type: db.Schema.Types.ObjectId,
      ref: "User",
    },
    default_bonus: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Position = db.model("Position", PositionSchema);

export default Position;
