import { JwtService } from "@nestjs/jwt";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { Test } from "@nestjs/testing";
import { User } from "../models/user.model";
import { CreateUserDto } from "../dto/create-user.dto";
import { userStub } from "./stubs/user.stub";

jest.mock("../users.service");

describe("Users controller testing", () => {
  let usersController: UsersController;
  let userService: UsersService;

  beforeAll(async () => {
    const modulRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, JwtService],
    }).compile();

    usersController = modulRef.get<UsersController>(UsersController);
    userService = modulRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it("User controller should be defined", () => {
    expect(usersController).toBeDefined();
  });

  test("user service should be defined", () => {
    expect(userService).toBeDefined();
  });


  describe("create User testing", ()=>{
    describe("when create user called ", ()=>{
        let user: User
        let createUserDto: CreateUserDto
        beforeAll(async ()=>{
            createUserDto = {
                name: userStub().name!,
                email: userStub().email!,
                password: userStub().password!,
                value: "user"
            }
            user = await usersController.create(createUserDto)
        })

        it("then it should call user userService", ()=>{
            expect(userService.create).toHaveBeenCalledWith(createUserDto)
        } )

        it("then it should return user", ()=>{
            expect(user).toEqual(userStub())
        })
    })
  })

  describe("findAll users" , ()=>{
    describe("when findAll users called", ()=>{
        let users: User[]
        beforeAll(async ()=>{
            users = await usersController.findAll()
            console.log(users);
        })

        it("then it should call userService", ()=>{
            expect(userService.findAll).toHaveBeenCalled()
        })

        test("then it should return users", ()=>{
            expect(users).toEqual([userStub()])
        })
    })
  })

  describe("findOne user", ()=>{
    describe("when findOne user called", ()=>{
        let user: User | null
        let id: number
        beforeAll(async ()=>{
            id = userStub().id as number
            user = await usersController.findOne(id)
        })

        it("then it should call user userService", ()=>{
            expect(userService.findOne).toHaveBeenCalledWith(id)
        } )

        it("then it should return user", ()=>{
            expect(user).toEqual(userStub())
        })
    })
  })

  describe("Remove user" , ()=>{
    describe("when findOne user called", ()=>{
        let user: Object 
        beforeAll(async ()=>{
            user = await usersController.remove(String(userStub().id))
        })

        it("then it should call user userService", ()=>{
            expect(userService.remove).toHaveBeenCalledWith(userStub().id)
        } )

        it("then it should return user", ()=>{
            expect(user).toEqual({message: "removed"})
        })
    })
  })
});
