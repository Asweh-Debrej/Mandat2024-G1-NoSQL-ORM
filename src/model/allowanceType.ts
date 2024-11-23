import db from "mongoose";

const AllowanceTypeSchema = new db.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AllowanceType = db.model("AllowanceType", AllowanceTypeSchema);

export default AllowanceType;
