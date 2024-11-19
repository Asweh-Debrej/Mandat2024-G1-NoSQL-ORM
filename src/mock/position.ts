import { faker } from "@faker-js/faker";
import Position from "@/model/position";

export const generatePosition = () => {
  const position = new Position({
    name: faker.person.jobTitle(),
    description: faker.lorem.sentence(),
    head: undefined,
    default_bonus: faker.number.int({ min: 0, max: 100 }) * 100000,
  });

  return position;
};

export const generatePositions = (count: number) => {
  return Array.from(Array(count), generatePosition);
};
