import { faker } from "@faker-js/faker";
import Kpi from "@/model/kpi";

const generateDetail = () => {
  return {
    target: faker.number.int({ min: 0, max: 100 }),
    realization: faker.number.int({ min: 0, max: 100 }),
    indicator: faker.lorem.sentence(),
    type: faker.helpers.arrayElement(["yearly", "monthly"]),
    weight: faker.number.int({ min: 0, max: 100 }),
  };
};

export const generateKpi = () => {
  return new Kpi({
    user: undefined,
    performance: faker.number.int({ min: 0, max: 100 }),
    details: Array.from(
      Array(faker.number.int({ min: 1, max: 5 })),
      generateDetail
    ),
  });
};

export const generateKpis = (count: number) => {
  return Array.from(Array(count), generateKpi);
};
