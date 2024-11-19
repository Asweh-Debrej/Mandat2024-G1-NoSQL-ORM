import db from "mongoose";

export const MartialType = ["single", "married", "divorced", "widowed"] as const;
export type MartialType = typeof MartialType[number];

export const BloodType = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;
export type BloodType = typeof BloodType[number];

export const EducationType = ["SD", "SMP", "SMA", "D3", "S1", "S2", "S3"] as const;
export type EducationType = typeof EducationType[number];

export const nipPattern = /[1-9]{8}/;

const UserSchema = new db.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nip: {
      type: String,
      required: true,
      match: nipPattern,
    },
    email: {
      type: String,
      required: true,
    },
    phone: [String],
    emergencyNumber: [String],
    address: String,
    birth: {
      city: String,
      country: String,
      date: Date,
    },
    maritalStatus: {
      type: String,
      enum: MartialType,
    },
    bloodType: {
      type: String,
      enum: BloodType,
    },
    education: {
      type: String,
      enum: EducationType,
    },
    department: {
      type: db.Schema.Types.ObjectId,
      ref: "Department",
    },
    position: {
      type: db.Schema.Types.ObjectId,
      ref: "Position",
    },
    joinDate: Date,
    resignDate: Date,
    status: {
      type: String,
      enum: ["active", "resign", "retired"],
      default: "active",
    },
    jobExperience: [
      {
        company: String,
        position: String,
        start: Date,
        end: Date,
      },
    ],
    kpi: [
      {
        type: db.Schema.Types.ObjectId,
        ref: "Kpi",
      },
    ],
    dependents: [
      {
        name: String,
        address: String,
        relation: String,
      },
    ],
  },
  { timestamps: true }
);

const User = db.model("User", UserSchema);

export default User;
