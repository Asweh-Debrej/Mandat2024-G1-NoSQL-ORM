import db from "mongoose";

const BankSchema = new db.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Bank = db.model("Bank", BankSchema);

export default Bank;
