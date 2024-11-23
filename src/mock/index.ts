import { config } from "dotenv";
import db from "mongoose";
import { faker } from "@faker-js/faker";

import AllowanceType from "@/model/allowanceType";
import Attendance from "@/model/attendance";
import Department from "@/model/department";
import Kpi from "@/model/kpi";
import Bank from "@/model/bank";
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
import { generateAllowanceType, generateAllowanceTypes } from "./allowanceType";
import { generateBanks } from "./bank";
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
  const allowanceTypeCount = 15;
  const bankCount = 10;
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
    await AllowanceType.deleteMany({});
    await Attendance.deleteMany({});
    await Department.deleteMany({});
    await Kpi.deleteMany({});
    await Bank.deleteMany({});
    await Leave.deleteMany({});
    await Payroll.deleteMany({});
    await PayrollItem.deleteMany({});
    await Position.deleteMany({});
    await User.deleteMany({});
    console.log("Existing data dropped...");

    console.log("Creating mock data...");

    const allowanceTypeDocs = generateAllowanceTypes(allowanceTypeCount);
    const bankDocs = generateBanks(bankCount);
    const departmentDocs = generateDepartments(departmentCount);
    const positionDocs = generatePositions(positionCount);
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
      const allowanceTypes = faker.helpers.arrayElements(allowanceTypeDocs);
      const bankIdx = faker.number.int({ min: 0, max: bankCount - 1 });
      payrollDoc.allowances = new db.Types.DocumentArray(
        allowanceTypes.map((allowanceType) => ({
          type: allowanceType._id,
          amount: (faker.number.int({ min: 0, max: 100 }) * 100000),
        }))
      );
      payrollDoc.bank.name = bankDocs[bankIdx].name;
      payrollDoc.user = {
        ...user,
        position : {
          _id: user.position,
          title: positionDocs.find((pos) => pos._id === user.position).title
        },
        department : {
          _id: user.department,
          name: departmentDocs.find((dept) => dept._id === user.department).name
        }
      };
      return payrollDoc;
    });
    const payrollItemDocs = generatePayrollItems(payrollItemCount).map((payrollItem) => {
      const payrollIdx = faker.number.int({ min: 0, max: userCount - 1 });
      const payroll = payrollDocs[payrollIdx];
      payrollItem.user = payroll.user;
      payrollItem.payroll = {
        _id: payroll._id,
        base_salary: payroll.base_salary,
        bank: payroll.bank,
        use_bpjs: payroll.use_bpjs,
      };
      return payrollItem;
    });
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
      leave.department = user.department;
      return leave;
    });
    const kpiDocs = generateKpis(kpiCount).map((doc) => {
      const payrollIdx = faker.number.int({ min: 0, max: userCount - 1 });
      const payrollDoc = payrollDocs[payrollIdx];
      doc.user = payrollDoc.user;
      doc.payroll = {
        _id: payrollDoc._id,
        base_salary: payrollDoc.base_salary,
      };

      return doc;
    });

    departmentDocs.forEach((doc) => {
      const headIdx = faker.number.int({ min: 0, max: userCount - 1 });
      doc.dept_head = userDocs[headIdx]._id;
    });
    positionDocs.forEach((doc) => {
      const headIdx = faker.number.int({ min: 0, max: userCount - 1 });
      doc.position_head = userDocs[headIdx]._id;
    });


    console.log("Saving mock data...");

    await Department.insertMany(departmentDocs);
    await Position.insertMany(positionDocs);
    await Kpi.insertMany(kpiDocs);
    await User.insertMany(userDocs);
    await Payroll.insertMany(payrollDocs);
    await PayrollItem.insertMany(payrollItemDocs);
    await Bank.insertMany(bankDocs);
    await AllowanceType.insertMany(allowanceTypeDocs);
    await Attendance.insertMany(attendanceDocs);
    await Leave.insertMany(leaveDocs);

    console.log("Mock data created...");

    await session.commitTransaction();
    console.log("Transaction committed...");
  } catch (error) {
    console.error("Error creating mock data...");
    console.error(error);

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
