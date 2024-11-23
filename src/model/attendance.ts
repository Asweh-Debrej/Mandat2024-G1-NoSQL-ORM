import db from "mongoose";

export const AttendanceType = ["present", "absent", "sick", "leave"] as const;
export type AttendanceType = typeof AttendanceType[number];

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
    attendanceType: {
      type: String,
      required: true,
      enum: AttendanceType,
    },
    clockIn: Date,
    clockOut: Date,
    notes: String,
  },
  { timestamps: true }
);

const Attendance = db.model("Attendance", AttendanceSchema);

export default Attendance;
