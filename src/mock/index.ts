import { config } from "dotenv";
import db from "mongoose";
import { faker } from "@faker-js/faker";

import Allowance from "@/model/allowance";
import Attendance from "@/model/attendance";
import Department from "@/model/department";
import Kpi from "@/model/kpi";
import Leave from "@/model/leave";
import Payroll from "@/model/payroll";
import PayrollItem from "@/model/payrollItem";
import Position from "@/model/position";
import User from "@/model/user";

import { generateDepartments } from "./department";
import { generateUsers } from "./users";
import { generatePositions } from "./position";
import { generateKpis } from "./kpi";
import { generateAttendances } from "./attendance";
import { generateAllowances } from "./allowance";
import { generateLeaves } from "./leave";
import { generatePayroll } from "./payroll";
import { generatePayrollItems } from "./payrollItem";

config();
const uri = process.env.MONGO_URI;

const mockData = async () => {
  const userCount = 100;
  const departmentCount = 10;
  const positionCount = 25;
  const kpiCount = 1000;
  const attendanceCount = 10000;
  const allowanceCount = 200;
  const leaveCount = 30;
  const payrollItemCount = 1000;

  console.log("Starting mock data script...");

  await db.connect(uri);

  console.log("Connected to database...");

  const session = await db.startSession();
  session.startTransaction();
  console.log("Transaction started...");

  try {
    console.log("Dropping existing data...");
    await Allowance.deleteMany({});
    await Attendance.deleteMany({});
    await Department.deleteMany({});
    await Kpi.deleteMany({});
    await Leave.deleteMany({});
    await Payroll.deleteMany({});
    await PayrollItem.deleteMany({});
    await Position.deleteMany({});
    await User.deleteMany({});
    console.log("Existing data dropped...");

    console.log("Creating mock data...");

    const departmentDocs = generateDepartments(departmentCount);
    const positionDocs = generatePositions(positionCount);
    const payrollItemDocs = generatePayrollItems(payrollItemCount);
    const userDocs = generateUsers(userCount).map((userDoc) => {
      const deptIdx = faker.number.int({ min: 0, max: departmentCount - 1 });
      const posIdx = faker.number.int({ min: 0, max: positionCount - 1 });

      const department = departmentDocs[deptIdx];
      const position = positionDocs[posIdx];

      userDoc.department = department._id;
      userDoc.position = position._id;

      return userDoc;
    });
    const payrollDocs = userDocs.map((user) => {
      const payrollDoc = generatePayroll();
      payrollDoc.user = user._id;
      return payrollDoc;
    });
    const allowanceDocs = generateAllowances(allowanceCount).map(
      (allowance) => {
        const userIdx = faker.number.int({ min: 0, max: userCount - 1 });
        const user = userDocs[userIdx];
        allowance.user = user._id;
        return allowance;
      }
    );
    const attendanceDocs = generateAttendances(attendanceCount).map(
      (attendance) => {
        const userIdx = faker.number.int({ min: 0, max: userCount - 1 });
        const user = userDocs[userIdx];
        attendance.user = user._id;
        return attendance;
      }
    );
    const leaveDocs = generateLeaves(leaveCount).map((leave) => {
      const userIdx = faker.number.int({ min: 0, max: userCount - 1 });
      const user = userDocs[userIdx];
      leave.user = user._id;
      return leave;
    });

    departmentDocs.forEach((doc) => {
      const headIdx = faker.number.int({ min: 0, max: userCount - 1 });
      doc.head = userDocs[headIdx]._id;
    });
    positionDocs.forEach((doc) => {
      const headIdx = faker.number.int({ min: 0, max: userCount - 1 });
      doc.head = userDocs[headIdx]._id;
    });
    const kpiDocs = generateKpis(kpiCount).forEach((doc) => {
      const userIdx = faker.number.int({ min: 0, max: userCount - 1 });
      const user = userDocs[userIdx];
      doc.user = user._id;

      user.kpi.push(doc._id);
    });


    console.log("Saving mock data...");

    await Department.insertMany(departmentDocs);
    await Position.insertMany(positionDocs);
    await Kpi.insertMany(kpiDocs);
    await User.insertMany(userDocs);
    await Payroll.insertMany(payrollDocs);
    await PayrollItem.insertMany(payrollItemDocs);
    await Allowance.insertMany(allowanceDocs);
    await Attendance.insertMany(attendanceDocs);
    await Leave.insertMany(leaveDocs);

    console.log("Mock data created...");

    await session.commitTransaction();
    console.log("Transaction committed...");
  } catch (error) {
    console.error("Error creating mock data...");
    console.error(error.message);

    await session.abortTransaction();
    console.log("Transaction aborted...");
  } finally {
    session.endSession();
    console.log("Session ended...");
  }

  console.log("Mock data script completed...");

  process.exit(0);
};

mockData();
