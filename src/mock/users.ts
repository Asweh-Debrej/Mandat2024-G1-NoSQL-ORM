import { faker } from "@faker-js/faker";
import User, {
  nipPattern,
  MartialType,
  BloodType,
  EducationType,
} from "@/model/user";

const generateDependent = () => {
  return {
    name: faker.person.fullName(),
    birth: faker.date.past(),
    relation: faker.helpers.arrayElement([
      "Father",
      "Mother",
      "Husband",
      "Wife",
      "Son",
      "Daughter",
    ]),
  };
};

const generatePhone = () => {
  return faker.phone.number({ style: "international" });
};

const generateJobExperience = () => {
  const start = faker.date.past();

  return {
    company: faker.company.name(),
    position: faker.person.jobTitle(),
    start,
    end: faker.date.between({
      from: start,
      to: Date.now(),
    }),
  };
};

export const generateUser = () => {
  const user = new User({
    name: faker.person.fullName(),
    nip: faker.helpers.fromRegExp(nipPattern),
    email: faker.internet.email(),
    phone: Array.from(
      Array(faker.number.int({ min: 0, max: 3 })),
      generatePhone
    ),
    emergencyNumber: Array.from(
      Array(faker.number.int({ min: 0, max: 3 })),
      generatePhone
    ),
    address: faker.location.streetAddress({ useFullAddress: true }),
    birth: {
      city: faker.location.city(),
      country: faker.location.country(),
      date: faker.date.past(),
    },
    maritalStatus: faker.helpers.arrayElement(MartialType),
    bloodType: faker.helpers.arrayElement(BloodType),
    education: faker.helpers.arrayElement(EducationType),
    department: undefined,
    position: undefined,
    joinDate: faker.date.past(),
    resignDate: faker.date.future(),
    jobExperience: Array.from(
      Array(faker.number.int({ min: 0, max: 3 })),
      generateJobExperience
    ),
    kpi: [],
    dependents: Array.from(
      Array(faker.number.int({ min: 0, max: 3 })),
      generateDependent
    ),
  });

  return user;
};

export const generateUsers = (count: number) => {
  return Array.from(Array(count), generateUser);
};
