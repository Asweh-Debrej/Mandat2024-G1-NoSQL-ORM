import db from "mongoose";

export const npwpPattern = /[1-9]{2}.[1-9]{3}.[1-9]{3}.[1-9]{1}-[1-9]{3}.[1-9]{3}/;
export const bpjsTenagaKerjaPattern = /[1-9]{13}/;
export const bpjsKesehatanPattern = /[1-9]{16}/;

const PayrollSchema = new db.Schema(
  {
    user: {
      type: db.Schema.Types.ObjectId,
      ref: "User",
    },
    npwp: {
      type: String,
      required: true,
      match: npwpPattern,
    },
    salary: {
      type: Number,
      required: true,
    },
    bank: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    bpjsTenagaKerja: {
      date: Date,
      number: {
        type: String,
        match: bpjsTenagaKerjaPattern,
      },
    },
    bpjsKesehatan: {
      date: Date,
      number: {
        type: String,
        match: bpjsKesehatanPattern,
      },
    },
  },
  { timestamps: true }
);

const Payroll = db.model("Payroll", PayrollSchema);

export default Payroll;
