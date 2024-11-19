import { faker } from "@faker-js/faker";
import Payroll, { npwpPattern, bpjsKesehatanPattern, bpjsTenagaKerjaPattern } from "@/model/payroll";

export const generatePayroll = () => {
  const payroll = new Payroll({
    user: undefined,
    npwp: faker.helpers.fromRegExp(npwpPattern),
    salary: Math.floor(Math.random() * 100) * 1000000,
    bank: faker.finance.accountName(),
    accountNumber: faker.finance.accountNumber(),
    accountName: faker.finance.accountName(),
    bpjsTenagaKerja: {
      date: faker.date.past(),
      number: faker.helpers.fromRegExp(bpjsTenagaKerjaPattern),
    },
    bpjsKesehatan: {
      date: faker.date.past(),
      number: faker.helpers.fromRegExp(bpjsKesehatanPattern),
    },
  });

  return payroll;
};

export const generatePayrolls = (count: number) => {
  return Array.from(Array(count), generatePayroll);
};
