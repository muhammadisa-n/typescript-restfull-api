import { User } from "@prisma/client";
import { Validation } from "../helper/validation";
import {
  ContactResponse,
  CreateContactRequest,
  toContactResponse,
} from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../helper/response-error";

export class ContactService {
  static async create(
    user: User,
    request: CreateContactRequest
  ): Promise<ContactResponse> {
    const createRequest = Validation.validate(
      ContactValidation.CREATE,
      request
    );
    const data = {
      ...createRequest,
      ...{
        username: user.username,
      },
    };
    const contact = await prismaClient.contact.create({
      data: data,
    });
    return toContactResponse(contact);
  }
  static async get(user: User, id: number): Promise<ContactResponse> {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: id,
        username: user.username,
      },
    });
    if (!contact) {
      throw new ResponseError(404, "Contact Not Found");
    }
    return toContactResponse(contact);
  }
}
