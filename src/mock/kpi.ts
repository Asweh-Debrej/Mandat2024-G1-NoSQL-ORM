import { faker } from "@faker-js/faker";
import Kpi from "@/model/kpi";

export const generateKpi = () => {
  const kpi = new Kpi({
    user: undefined,
    target: faker.number.int({ min: 0, max: 100 }),
    score: faker.number.int({ min: 0, max: 100 }),
    indicator: faker.lorem.sentence(),
    type: faker.helpers.arrayElement(["yearly", "monthly"]),
    weight: faker.number.int({ min: 0, max: 100 }),
  });

  return kpi;
};

export const generateKpis = (count: number) => {
  return Array.from(Array(count), generateKpi);
};
