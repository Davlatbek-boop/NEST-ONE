import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import * as request from "supertest";

describe("User (e2e)", () => {
  let app: INestApplication;
  let token: String;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // app.setGlobalPrefix("api")
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const response = await request(app.getHttpServer())
      .post("/auth/sign-in")
      .send({
        email: "dimaaaa@mail.uz",
        password: "qewrty",
        value: "admin",
      });
    token = response.body.token;

    console.log("token", token);
  });

  it("/users (GET) --> 200 OK", () => {
    return request(app.getHttpServer())
      .get("/users")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("/users (GET) --> 401 error", () => {
    return (
      request(app.getHttpServer())
        .get("/users")
        // .set("Authorization", `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(401)
    );
  });

  //   it("/auth/sign-up (POST) -->  201", async()=>{
  //     return request(app.getHttpServer())
  //     .post("auth/sign-up")
  //     .send({
  //         "name": "dima",
  //         "email": "ano@mail.uz",
  //         "password": "qewrty",
  //         "value": "user"
  //     })
  //     .expect("Content-Type", /json/)
  //     .expect(201)
  //   })

  it("/auth/sign-up (POST) --> 400", () => {
    return request(app.getHttpServer())
      .post("/auth/sign-up")
      .send({
        name: "dima",
        email: "ano@mail.uz",
        password: "qewrty",
        value: "user",
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .expect({
        message: "Bunday emailli foydalanuvchi mavjud",
        error: "Bad Request",
        statusCode: 400,
      });
  });

  it("/auth/sign-up (POST) --> 400 validation error", () => {
    return request(app.getHttpServer())
      .post("/auth/sign-up")
      .send({
        name: "dima",
        email: "ano@mail.uz",
        password: "qewr",
        value: "user",
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .expect({
        message: ["password is not strong enough"],
        error: "Bad Request",
        statusCode: 400,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
