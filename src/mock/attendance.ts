import { faker } from "@faker-js/faker";
import Attendance, { AttendanceStatus } from "@/model/attendance";
import { DAY, HOUR } from "@/types";

export const generateAttendance = () => {
  const date = faker.date.past();
  date.setHours(-date.getTimezoneOffset()/60, 0, 0, 0);
  const checkIn = new Date(date.getTime() + faker.number.int({ min: 7 * HOUR, max: 10 * HOUR }));
  const checkOut = new Date(checkIn.getTime() + faker.number.int({ min: 8 * HOUR, max: 12 * HOUR }));

  const attendance = new Attendance({
    user: undefined,
    date,
    checkIn,
    checkOut,
    status: faker.helpers.arrayElement(AttendanceStatus),
  });

  return attendance;
};

export const generateAttendances = (count: number) => {
  return Array.from(Array(count), generateAttendance);
};
