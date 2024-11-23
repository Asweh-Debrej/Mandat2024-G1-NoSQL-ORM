import db from "mongoose";

const DepartmentSchema = new db.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dept_head: {
      type: db.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Department = db.model("Departement", DepartmentSchema);

export default Department;
