import { Contact, User } from "@prisma/client";
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
  static async get(): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        username: "muhammadisa226",
      },
    });

    if (!user) {
      throw new Error("User is not found");
    }

    return user;
  }
}
export class ContactTest {
  static async deleteAll() {
    await prismaClient.contact.deleteMany({
      where: {
        username: "muhammadisa226",
      },
    });
  }

  static async create() {
    await prismaClient.contact.create({
      data: {
        first_name: "test",
        last_name: "test",
        email: "test@example.com",
        phone: "08999999",
        username: "muhammadisa226",
      },
    });
  }

  static async get(): Promise<Contact> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        username: "muhammadisa226",
      },
    });

    if (!contact) {
      throw new Error("Contact is not found");
    }

    return contact;
  }
}
