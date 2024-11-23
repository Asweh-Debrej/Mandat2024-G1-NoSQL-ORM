import db from "mongoose";

export const LeaveType = ["annual", "sick", "unpaid"] as const;
export type LeaveType = typeof LeaveType[number];

export const LeaveStatus = ["pending", "approved", "rejected"] as const;
export type LeaveStatus = typeof LeaveStatus[number];

export const LeaveSchema = new db.Schema(
  {
    user: {
      type: db.Schema.Types.ObjectId,
      ref: "User",
    },
    department: {
      type: db.Schema.Types.ObjectId,
      ref: "Department",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: LeaveType,
    },
    description: {
      type: String,
      required: true,
    },
    fileUrl: String,
    eventName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    hrApproval: {
      type: String,
      enum: LeaveStatus,
      default: "pending",
    },
    managerApproval: {
      type: String,
      enum: LeaveStatus,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Leave = db.model("Leave", LeaveSchema);

export default Leave;
