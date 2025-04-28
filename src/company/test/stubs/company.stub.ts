import { Company } from "../../models/company.model";

export const companyStub = (): Partial<Company> => {
  return {
    id: 1,
    name: "user1",
    email: "user@mail.uz",
    phone: "90-123-45-67",
    address: "Qatortol 9",
  };
};
