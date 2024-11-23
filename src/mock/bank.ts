import { faker } from "@faker-js/faker";
import Bank from "@/model/bank";

export const generateBank = () => {
  const bank = new Bank({
    name: faker.company.name(),
  });

  return bank;
};

export const generateBanks = (count: number) => {
  return Array.from(Array(count), generateBank);
};
