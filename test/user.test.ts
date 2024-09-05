import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";

describe('POST "api/users', () => {
  afterEach(async () => {
    await UserTest.delete();
  });
  it("should reject register new user if request is invalid ", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
  it("should  register new user ", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "muhammadisa226",
      password: "rahasia8",
      name: "Muhammad Isa",
    });
    logger.debug(response.body);
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("muhammadisa226");
    expect(response.body.data.name).toBe("Muhammad Isa");
  });
});

describe('POST "api/users/login', () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delete();
  });
  it("should login success", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "muhammadisa226",
      password: "muhammadisa226",
    });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });
});
