import { JwtService } from "@nestjs/jwt";
import { CompanyController } from "../company.controller";
import { CompanyService } from "../company.service";
import { Test } from "@nestjs/testing";
import { Company } from "../models/company.model";
import { CreateCompanyDto } from "../dto/create-company.dto";
import { companyStub } from "./stubs/company.stub";
import { before } from "node:test";

jest.mock("../company.service");

describe("Company controller testing", () => {
  let companyController: CompanyController;
  let companyService: CompanyService;

  beforeAll(async () => {
    const modulRef = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [CompanyService, JwtService],
    }).compile();

    companyController = modulRef.get<CompanyController>(CompanyController);
    companyService = modulRef.get<CompanyService>(CompanyService);
    jest.clearAllMocks();
  });

  it("Company controller should be defined", () => {
    expect(companyController).toBeDefined();
  });

  test("Company service should be defined", () => {
    expect(companyService).toBeDefined();
  });

  describe("create company testting", () => {
    describe("when create user called", () => {
      let company: Company;
      let createCompanyDto: CreateCompanyDto;
      beforeAll(async () => {
        createCompanyDto = {
          name: companyStub().name!,
          email: companyStub().email!,
          phone: companyStub().phone!,
          address: companyStub().address!,
        };
        company = await companyController.createCompany(createCompanyDto)
      });

      it("then it should call company companyService", ()=>{
        expect(companyService.createCompany).toHaveBeenCalledWith(createCompanyDto)
      })

      it("then it should return company", ()=>{
        expect(company).toEqual(companyStub())
      })
    });
  });


  describe("findAll company", ()=>{
    describe("when findAll company called", ()=>{
        let company: Company[]
        beforeAll(async ()=>{
            company = await companyController.findAllCompanies()
        })

        it ("then it should call CompanyService", ()=>{
            expect(companyService.findAllCompanies).toHaveBeenCalled()
        })

        it("then it should return company", ()=>{
            expect(company).toEqual([companyStub()])
        })
    })
  })

  describe("findOne company", ()=>{
    describe("when findOne company called", ()=>{
        let company: Company | null
        let id: number
        beforeAll(async()=>{
            id = companyStub().id as number
            company = await companyController.findOneCompanies(String(id))
        })

        it("then it should call company companyService", ()=>{
            expect(companyService.findOneCompanies).toHaveBeenCalledWith(id)
        })

        it("then it should return company",()=>{
            expect(company).toEqual(companyStub())
        })
    })
  })

  describe("Remove company", ()=>{
    describe("when remove company called", ()=>{
        let company: Object
        beforeAll(async()=>{
            company = await companyController.deleteCompany(String(companyStub().id))
        })

        it("then it should call company companyService", ()=>{
            expect(companyService.deleteCompany).toHaveBeenCalledWith(companyStub().id)
        })

        it("then it should return company", ()=>{
            expect(company).toEqual({message: "removed"})
        })
    })
  })
});
