import db from "mongoose";
import { config } from "dotenv";

import PayrollItem from "@/model/payrollItem";
import Payroll from "@/model/payroll";
import User from "@/model/user";
import Kpi from "@/model/kpi";

config();
const uri = process.env.MONGO_URI;

const runQueries = async () => {
  await db.connect(uri);
  const session = await db.startSession();
  console.log("Connected to database...");
  console.log("Running queries...");

  // q1 : Retrieves Payroll Item Details by User ID
  const userId = "6741e1fafac86b2443821c96";
  // q2 : Retrieves All Employees Data, Can be Searched by Their Name
  const searchNamePattern = "ka";
  const searchStatus = "active";
  // q3 : Retrieves Active Employee Information Along with Their Department, Position, and Payroll Details
  const searchStatus2 = "active";
  // q4 : Summary of KPI Performance and Payroll Statistics for Each Department for Active User
  // q5 : Update Payroll Informations
  const userIdToUpdate = "6741e1fafac86b2443821c96";
  const newBaseSalary = 15000000;

  // Retrieves Payroll Item Details by User ID
  console.log(
    "\n\nRetrieving Payroll Item Details by User ID... (User ID: " +
      userId +
      ")"
  );
  const payrollItem = await PayrollItem.findOne({
    "user._id": userId,
  });

  console.log(payrollItem);

  // Retrieves All Employees Data, Can be Searched by Their Name
  console.log(
    "\n\nRetrieving All Employees Data, Can be Searched by Their Name... (Name: " +
      searchNamePattern +
      ")"
  );
  const users = await User.find({
    $and: [
      {
        full_name: {
          $regex: searchNamePattern,
          $options: "i",
        },
      },
      {
        status: {
          $eq: searchStatus,
        },
      },
    ],
  }).limit(3);

  console.log(users);

  // Retrieves Active Employee Information Along with Their Department, Position, and Payroll Details
  console.log(
    "\n\nRetrieving Active Employee Information Along with Their Department, Position, and Payroll Details..."
  );
  const payroll = await PayrollItem.find({
    "user.status": searchStatus2,
  }).limit(3);

  console.log(payroll);

  // Summary of KPI Performance and Payroll Statistics for Each Department for Active User
  console.log(
    "\n\nSummary of KPI Performance and Payroll Statistics for Each Department for Active User..."
  );
  const kpi = await Kpi.aggregate([
    {
      $match: {
        "user.status": "active",
      },
    },
    {
      $group: {
        _id: "$user.department._id",
        department: { $first: "$user.department.name" },
        total_employee: { $sum: 1 },
        total_performance: { $sum: "$performance" },
        avg_performance: { $avg: "$performance" },
        max_performance: { $max: "$performance" },
        min_performance: { $min: "$performance" },
        avg_base_salary: { $avg: "$payroll.base_salary" },
        total_base_salary: { $sum: "$payroll.base_salary" },
      },
    },
    {
      $match: {
        total_employee: { $gt: 0 },
      },
    },
    {
      $sort: {
        department: -1,
      },
    },
  ]).limit(3);

  console.log(kpi);

  //  Update Payroll Informations
  console.log(
    "\n\nUpdating Payroll Informations... (User ID: " + userIdToUpdate + ")"
  );

  session.startTransaction();
  try {
    const payroll = await Payroll.findOneAndUpdate(
      {
        "user._id": userIdToUpdate,
      },
      {
        base_salary: newBaseSalary,
      },
      { new: true, session }
    );

    // tambahan query lainnya dalam transaksi yang sama

    // apakah perlu update juga di collection payrollItem? jawaban: tidak perlu, karena data payrollItem merupakan snapshot dari data payroll

    console.log(payroll);
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
  session.endSession();

  console.log("Queries finished...");

  process.exit(0);
};

runQueries();
