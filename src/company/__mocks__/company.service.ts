import { companyStub } from "../test/stubs/company.stub";


export const CompanyService = jest.fn().mockReturnValue({
    createCompany: jest.fn().mockResolvedValue(companyStub()),
    findAllCompanies: jest.fn().mockResolvedValue([companyStub()]),
    findOneCompanies: jest.fn().mockResolvedValue(companyStub()),
    deleteCompany: jest.fn().mockReturnValue({ message: `removed` }),
});
