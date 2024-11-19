import { faker } from "@faker-js/faker";
import Allowance from "@/model/allowance";

export const generateAllowance = () => {
  const allowance = new Allowance({
    user: undefined,
    amount: Math.floor(Math.random() * 100) * 100000,
    type: faker.helpers.arrayElement(["bonus", "salary"]),
  });

  return allowance;
};

export const generateAllowances = (count: number) => {
  return Array.from(Array(count), generateAllowance);
};
