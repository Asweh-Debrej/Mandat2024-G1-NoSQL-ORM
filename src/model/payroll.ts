import db from "mongoose";

import { nipPattern, StatusType } from "./user";

export const npwpPattern = /[1-9]{2}.[1-9]{3}.[1-9]{3}.[1-9]{1}-[1-9]{3}.[1-9]{3}/;
export const bpjsTenagaKerjaPattern = /[1-9]{13}/;
export const bpjsKesehatanPattern = /[1-9]{16}/;

const PayrollSchema = new db.Schema(
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
    npwp: {
      type: String,
      match: npwpPattern,
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
    bpjs: {
      kesehatan: {
        number: {
          type: String,
          match: bpjsKesehatanPattern,
        },
        date: {
          type: Date,
        },
      },
      ketenagakerjaan: {
        number: {
          type: String,
          match: bpjsTenagaKerjaPattern,
        },
        date: {
          type: Date,
        },
      },
    },
    allowances: [
      {
        type: {
          type: db.Schema.Types.ObjectId,
          ref: "Allowance",
        },
        amount: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const Payroll = db.model("Payroll", PayrollSchema);

export default Payroll;
