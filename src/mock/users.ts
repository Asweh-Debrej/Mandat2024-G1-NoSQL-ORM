import { faker } from "@faker-js/faker";
import User, {
  nipPattern,
  MartialType,
  BloodType,
  EducationType,
  GenderType,
  StatusType,
  nikPattern,
} from "@/model/user";

const generateDependent = () => {
  return {
    full_name: faker.person.fullName(),
    address: faker.location.streetAddress({ useFullAddress: true }),
    relationship: faker.helpers.arrayElement([
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
    description: faker.lorem.sentence(),
    start,
    end: faker.date.between({
      from: start,
      to: Date.now(),
    }),
  };
};

const generateUser = () => { // ini satu dokumen tetapi belum komplit
  return new User({
    email: faker.internet.email(),
    full_name: faker.person.fullName(),
    phone_number: Array.from(
      Array(faker.number.int({ min: 0, max: 3 })),
      generatePhone
    ),
    emergency_number: Array.from(
      Array(faker.number.int({ min: 0, max: 3 })),
      generatePhone
    ),
    place_of_birth: faker.location.city(),
    date_of_birth: faker.date.past(),
    gender: faker.helpers.arrayElement(GenderType),
    marital_status: faker.helpers.arrayElement(MartialType),
    blood_type: faker.helpers.arrayElement(BloodType),
    identity_number: faker.helpers.fromRegExp(nikPattern),
    address: faker.location.streetAddress({ useFullAddress: true }),
    last_education: faker.helpers.arrayElement(EducationType),
    nip: faker.helpers.fromRegExp(nipPattern),
    department: undefined,
    position: undefined,
    join_date: faker.date.past(),
    resign_date: faker.date.future(),
    status: faker.helpers.arrayElement(StatusType),
    job_experiences: Array.from(
      Array(faker.number.int({ min: 0, max: 3 })),
      generateJobExperience
    ),
    dependents: Array.from(
      Array(faker.number.int({ min: 0, max: 3 })),
      generateDependent
    ),
  });
};

export const generateUsers = (count: number) => {
  return Array.from(Array(count), generateUser);
};
