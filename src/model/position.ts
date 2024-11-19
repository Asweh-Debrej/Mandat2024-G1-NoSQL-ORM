import db from "mongoose";

const PositionSchema = new db.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    head: {
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
