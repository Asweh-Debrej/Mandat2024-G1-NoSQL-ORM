import { faker } from "@faker-js/faker";
import PayrollItem, { PayrollStatus } from "@/model/payrollItem";

export const generatePayrollItem = () => {
  return new PayrollItem({
    user: undefined,
    payroll: undefined,
    details: {
      allowances: [],
      deductions: [],
    },
    status: faker.helpers.arrayElement(PayrollStatus),
    net_salary: faker.number.int({ min: 0, max: 100 }) * 100000,
    date: faker.date.recent(),
  });
};

export const generatePayrollItems = (count: number) => {
  return Array.from(Array(count), generatePayrollItem);
};
