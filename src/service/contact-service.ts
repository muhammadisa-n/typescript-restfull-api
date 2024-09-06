import { Contact, User } from "@prisma/client";
import { Validation } from "../helper/validation";
import {
  ContactResponse,
  CreateContactRequest,
  SearchContactRequest,
  toContactResponse,
  UpdateContactRequest,
} from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../helper/response-error";
import { Pageable } from "../helper/page";

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

  static async checkContactMustExists(
    username: string,
    contactId: number
  ): Promise<Contact> {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: contactId,
        username: username,
      },
    });
    if (!contact) {
      throw new ResponseError(404, "Contact Not Found");
    }
    return contact;
  }
  static async get(user: User, id: number): Promise<ContactResponse> {
    const contact = await this.checkContactMustExists(user.username, id);
    return toContactResponse(contact);
  }
  static async update(
    user: User,
    request: UpdateContactRequest
  ): Promise<ContactResponse> {
    const updateRequest = Validation.validate(
      ContactValidation.UPDATE,
      request
    );
    await this.checkContactMustExists(user.username, updateRequest.id);
    const contact = await prismaClient.contact.update({
      where: {
        id: updateRequest.id,
        username: user.username,
      },
      data: updateRequest,
    });
    return toContactResponse(contact);
  }
  static async remove(user: User, id: number): Promise<ContactResponse> {
    await this.checkContactMustExists(user.username, id);
    const contact = await prismaClient.contact.delete({
      where: {
        id: id,
        username: user.username,
      },
    });
    return toContactResponse(contact);
  }
  static async search(
    user: User,
    request: SearchContactRequest
  ): Promise<Pageable<ContactResponse>> {
    const sarchRequest = Validation.validate(ContactValidation.SEARCH, request);
    const skip = (sarchRequest.page - 1) * sarchRequest.size;
    const filters = [];
    if (sarchRequest.name) {
      filters.push({
        OR: [
          {
            first_name: {
              contains: sarchRequest.name,
            },
          },
          {
            last_name: {
              contains: sarchRequest.name,
            },
          },
        ],
      });
    }
    if (sarchRequest.email) {
      filters.push({
        email: {
          contains: sarchRequest.email,
        },
      });
    }
    if (sarchRequest.phone) {
      filters.push({
        phone: {
          contains: sarchRequest.phone,
        },
      });
    }
    const contacts = await prismaClient.contact.findMany({
      where: {
        username: user.username,
        AND: filters,
      },
      take: sarchRequest.size,
      skip: skip,
    });
    const total = await prismaClient.contact.count({
      where: {
        username: user.username,
        AND: filters,
      },
    });
    return {
      data: contacts.map((contact) => toContactResponse(contact)),
      paging: {
        current_page: sarchRequest.page,
        total_page: Math.ceil(total / sarchRequest.size),
        size: sarchRequest.size,
      },
    };
  }
}
