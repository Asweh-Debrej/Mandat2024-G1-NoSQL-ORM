import db from "mongoose";

const KpiSchema = new db.Schema(
  {
    user: {
      type: db.Schema.Types.ObjectId,
      ref: "User",
    },
    target: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    indicator: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Kpi = db.model("Kpi", KpiSchema);

export default Kpi;
