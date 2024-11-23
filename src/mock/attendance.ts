import { faker } from "@faker-js/faker";
import Attendance, { AttendanceType } from "@/model/attendance";
import { HOUR } from "@/types";

export const generateAttendance = () => {
  const date = faker.date.past();
  date.setHours(-date.getTimezoneOffset() / 60, 0, 0, 0);
  const clockIn = new Date(date.getTime() + faker.number.int({ min: 7 * HOUR, max: 10 * HOUR }));
  const clockOut = new Date(clockIn.getTime() + faker.number.int({ min: 8 * HOUR, max: 12 * HOUR }));

  return new Attendance({
    user: undefined,
    date,
    attendanceType: faker.helpers.arrayElement(AttendanceType),
    clockIn,
    clockOut,
    notes: faker.lorem.sentence(),
  });
}

export const generateAttendances = (count: number) => {
  return Array.from(Array(count), generateAttendance);
};
