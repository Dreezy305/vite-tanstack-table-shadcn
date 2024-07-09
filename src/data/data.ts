import { faker } from "@faker-js/faker";

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
};

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

const statuses = ["relationship", "complicated", "single"];

const generatePerson = (): Person => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number({ min: 18, max: 80 }),
    visits: faker.datatype.number({ min: 0, max: 1000 }),
    progress: faker.datatype.number({ min: 0, max: 100 }),
    status: statuses[faker.datatype.number({ min: 0, max: 2 })] as
      | "relationship"
      | "complicated"
      | "single",
    subRows: [],
  };
};

export const generatePeople = (num: number): Person[] => {
  return Array.from({ length: num }, generatePerson);
};
