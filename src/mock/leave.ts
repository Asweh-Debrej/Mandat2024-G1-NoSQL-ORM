import { faker } from "@faker-js/faker";
import Leave, { LeaveStatus, LeaveType } from "@/model/leave";

export const generateLeave = () => {
  const leave = new Leave({
    user: undefined,
    startDate: faker.date.recent(),
    endDate: faker.date.future(),
    description: faker.lorem.sentence(),
    file: faker.system.filePath(),
    type: faker.helpers.arrayElement(LeaveType),
    location: faker.location.city(),
    hrStatus: faker.helpers.arrayElement(LeaveStatus),
    managerStatus: faker.helpers.arrayElement(LeaveStatus),
  });

  return leave;
};

export const generateLeaves = (count: number) => {
  return Array.from(Array(count), generateLeave);
};
