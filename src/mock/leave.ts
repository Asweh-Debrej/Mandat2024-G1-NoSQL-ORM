import { faker } from "@faker-js/faker";
import Leave, { LeaveStatus, LeaveType } from "@/model/leave";

// export const generateLeave = () => {
//   const leave = new Leave({
//     user: undefined,
//     startDate: faker.date.recent(),
//     endDate: faker.date.future(),
//     description: faker.lorem.sentence(),
//     file: faker.system.filePath(),
//     type: faker.helpers.arrayElement(LeaveType),
//     location: faker.location.city(),
//     hrStatus: faker.helpers.arrayElement(LeaveStatus),
//     managerStatus: faker.helpers.arrayElement(LeaveStatus),
//   });

//   return leave;
// };

export const generateLeave = () => {
  return new Leave({
    user: undefined,
    department: undefined,
    startDate: faker.date.recent(),
    endDate: faker.date.future(),
    type: faker.helpers.arrayElement(LeaveType),
    description: faker.lorem.sentence(),
    fileUrl: faker.system.filePath(),
    eventName: faker.lorem.sentence(),
    location: faker.location.city(),
    hrApproval: faker.helpers.arrayElement(LeaveStatus),
    managerApproval: faker.helpers.arrayElement(LeaveStatus),
  });
}

export const generateLeaves = (count: number) => {
  return Array.from(Array(count), generateLeave);
};
