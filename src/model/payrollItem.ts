import db from "mongoose";

import { StatusType } from "./user";

export const PayrollStatus = ["pending", "paid"] as const;
export type PayrollStatus = typeof PayrollStatus[number];

const PayrollItemSchema = new db.Schema(
  {
    user: {
      _id: {
        type: db.Schema.Types.ObjectId,
        ref: "User",
      },
      nip: {
        type: String,
        required: true,
      },
      full_name: {
        type: String,
        required: true,
      },
      department: {
        _id: {
          type: db.Schema.Types.ObjectId,
          ref: "Department",
        },
        name: {
          type: String,
          required: true,
        },
      },
      position: {
        _id: {
          type: db.Schema.Types.ObjectId,
          ref: "Position",
        },
        title: {
          type: String,
          required: true,
        },
      },
      join_date: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        required: true,
        enum: StatusType,
      },
    },
    payroll: {
      _id: {
        type: db.Schema.Types.ObjectId,
        ref: "Payroll",
      },
      base_salary: {
        type: Number,
        required: true,
      },
      bank: {
        name: {
          type: String,
          required: true,
        },
        account_number: {
          type: String,
          required: true,
        },
        account_name: {
          type: String,
          required: true,
        },
      },
      use_bpjs: {
        type: Boolean,
        default: true,
      },
    },
    details: {
      type: Object,
    },
    status: {
      type: String,
      required: true,
      enum: PayrollStatus,
    },
    net_salary: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const PayrollItem = db.model("PayrollItem", PayrollItemSchema);

export default PayrollItem;
