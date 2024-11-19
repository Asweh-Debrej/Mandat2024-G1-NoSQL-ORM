import { faker } from "@faker-js/faker";
import Department from "@/model/department";

export const generateDepartment = () => {
  const department = new Department({
    name: faker.company.name(),
    description: faker.lorem.sentence(),
    head: undefined,
  });

  return department;
};

export const generateDepartments = (count: number) => {
  return Array.from(Array(count), generateDepartment);
};
