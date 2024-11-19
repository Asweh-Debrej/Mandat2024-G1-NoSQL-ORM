import { faker } from "@faker-js/faker";
import Kpi from "@/model/kpi";

export const generateKpi = () => {
  const kpi = new Kpi({
    user: undefined,
    target: Math.floor(Math.random() * 100),
    score: Math.floor(Math.random() * 100),
    indicator: faker.lorem.sentence(),
    type: faker.helpers.arrayElement(["yearly", "monthly"]),
    weight: Math.floor(Math.random() * 100),
  });

  return kpi;
};

export const generateKpis = (count: number) => {
  return Array.from(Array(count), generateKpi);
};
