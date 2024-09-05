import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";
export class UserTest {
  static async delete() {
    await prismaClient.user.deleteMany({
      where: { username: "muhammadisa226" },
    });
  }

  static async create() {
    await prismaClient.user.create({
      data: {
        username: "muhammadisa226",
        name: "Muhammad Isa",
        password: await bcrypt.hash("muhammadisa226", 10),
        token: "test",
      },
    });
  }
}
