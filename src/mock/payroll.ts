import { faker } from "@faker-js/faker";
import Payroll, {
  npwpPattern,
  bpjsKesehatanPattern,
  bpjsTenagaKerjaPattern,
} from "@/model/payroll";

export const generatePayroll = () => {
  return new Payroll({
    user: undefined,
    npwp: faker.helpers.fromRegExp(npwpPattern),
    base_salary: faker.number.int({ min: 0, max: 100 }) * 1000000,
    bank: {
      name: undefined,
      account_number: faker.finance.accountNumber(),
      account_name: faker.finance.accountName(),
    },
    use_bpjs: faker.datatype.boolean(),
    bpjs: {
      kesehatan: {
        number: faker.helpers.fromRegExp(bpjsKesehatanPattern),
        date: faker.date.past(),
      },
      ketenagakerjaan: {
        number: faker.helpers.fromRegExp(bpjsTenagaKerjaPattern),
        date: faker.date.past(),
      },
    },
    allowances: [],
  });
};

export const generatePayrolls = (count: number) => {
  return Array.from(Array(count), generatePayroll);
};
