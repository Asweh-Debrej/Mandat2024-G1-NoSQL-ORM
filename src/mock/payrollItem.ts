import { faker } from "@faker-js/faker";
import PayrollItem, { PayrollStatus } from "@/model/payrollItem";

export const generatePayrollItem = () => {
  const payrollItem = new PayrollItem({
    payroll: undefined,
    net: Math.floor(Math.random() * 100) * 100000,
    status: faker.helpers.arrayElement(PayrollStatus),
  });

  return payrollItem;
};

export const generatePayrollItems = (count: number) => {
  return Array.from(Array(count), generatePayrollItem);
};
