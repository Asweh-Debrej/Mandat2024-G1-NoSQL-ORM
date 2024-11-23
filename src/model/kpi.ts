import db from "mongoose";

import { StatusType } from "./user";

const KpiSchema = new db.Schema(
  {
    user: {
      _id: {
        type: db.Schema.Types.ObjectId,
        ref: "User",
      },
      full_name: {
        type: String,
        required: true,
      },
      nip: {
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
    },
    performance: {
      type: Number,
      required: true,
    },
    details: [
      {
        target: {
          type: Number,
          required: true,
        },
        realization: {
          type: Number,
          required: true,
        },
        indicator: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        weight: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Kpi = db.model("Kpi", KpiSchema);

export default Kpi;
