import db from "mongoose";

export const PayrollStatus = ["pending", "paid"] as const;
export type PayrollStatus = typeof PayrollStatus[number];

const PayrollItemSchema = new db.Schema(
  {
    payroll: {
      type: db.Schema.Types.ObjectId,
      ref: "Payroll",
    },
    net: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: PayrollStatus,
      default: "pending",
    },
  },
  { timestamps: true }
);

const PayrollItem = db.model("PayrollItem", PayrollItemSchema);

export default PayrollItem;
