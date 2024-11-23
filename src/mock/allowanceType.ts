import { faker } from "@faker-js/faker";
import AllowanceType from "@/model/allowanceType";

export const generateAllowanceType = () => {
  return new AllowanceType({
    name: faker.lorem.word(),
  });
};

export const generateAllowanceTypes = (count: number) => {
  return Array.from(Array(count), generateAllowanceType);
};
