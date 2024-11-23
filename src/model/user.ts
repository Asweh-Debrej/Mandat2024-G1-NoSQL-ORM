import db from "mongoose";

export const MartialType = ["single", "married", "divorced", "widowed"] as const;
export type MartialType = typeof MartialType[number];

export const BloodType = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;
export type BloodType = typeof BloodType[number];

export const EducationType = ["SD", "SMP", "SMA", "D3", "S1", "S2", "S3"] as const;
export type EducationType = typeof EducationType[number];

export const GenderType = ["m", "f"] as const;
export type GenderType = typeof GenderType[number];

export const StatusType = ["active", "resign", "retired"] as const;
export type StatusType = typeof StatusType[number];

export const nipPattern = /[1-9]{8}/;
export const nikPattern = /[1-9]{16}/;

const UserSchema = new db.Schema({ // ini model: collection yang tidak schemaless
  email: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  phone_number: [String],
  emergency_number: [String],
  place_of_birth: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: GenderType,
  },
  marital_status: {
    type: String,
    required: true,
    enum: MartialType,
  },
  blood_type: {
    type: String,
    required: true,
    enum: BloodType,
  },
  identity_number: {
    type: String,
    required: true,
    match: nikPattern,
  },
  address: {
    type: String,
    required: true,
  },
  last_education: {
    type: String,
    enum: EducationType,
  },
  nip: {
    type: String,
    required: true,
    match: nipPattern,
  },
  department: {
    type: db.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  position: {
    type: db.Schema.Types.ObjectId,
    ref: "Position",
    required: true,
  },
  join_date: {
    type: Date,
    required: true,
  },
  resign_date: Date,
  status: {
    type: String,
    enum: StatusType,
    default: "active",
  },
  job_experiences: [
    {
      company_name: String,
      position: String,
      description: String,
      start_date: Date,
      end_date: Date,
    },
  ],
  dependents: [
    {
      full_name: String,
      address: String,
      relationship: String,
    },
  ],
}, { timestamps: true });

const User = db.model("User", UserSchema);

export default User;
