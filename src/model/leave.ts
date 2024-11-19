import db from "mongoose";

export const LeaveType = ["annual", "sick", "unpaid"] as const;
export type LeaveType = typeof LeaveType[number];

export const LeaveStatus = ["pending", "approved", "rejected"] as const;
export type LeaveStatus = typeof LeaveStatus[number];

const LeaveSchema = new db.Schema(
  {
    user: {
      type: db.Schema.Types.ObjectId,
      ref: "User",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    file: String,
    type: {
      type: String,
      enum: LeaveType,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    hrStatus: {
      type: String,
      enum: LeaveStatus,
      default: "pending",
    },
    managerStatus: {
      type: String,
      enum: LeaveStatus,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Leave = db.model("Leave", LeaveSchema);

export default Leave;
