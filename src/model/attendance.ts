import db from "mongoose";

export const AttendanceStatus = ["present", "absent", "sick", "leave"] as const;
export type AttendanceStatus = typeof AttendanceStatus[number];

const AttendanceSchema = new db.Schema(
  {
    user: {
      type: db.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
    },
    checkIn: Date,
    checkOut: Date,
    status: {
      type: String,
      enum: AttendanceStatus,
      default: "present",
    },
  },
  { timestamps: true }
);

const Attendance = db.model("Attendance", AttendanceSchema);

export default Attendance;
