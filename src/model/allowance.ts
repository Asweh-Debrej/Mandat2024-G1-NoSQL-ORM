import db from "mongoose";

const AllowanceSchema = new db.Schema(
  {
    user: {
      type: db.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    type: String
  },
  { timestamps: true }
);

const Allowance = db.model("Allowance", AllowanceSchema);

export default Allowance;
