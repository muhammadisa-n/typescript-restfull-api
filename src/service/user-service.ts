import { prismaClient } from "../application/database";
import { ResponseError } from "../helper/response-error";
import { Validation } from "../helper/validation";
import {
  createUserRequest,
  toUserResponse,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import bcrypt from "bcrypt";
export class UserService {
  static async register(request: createUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );
    const totalUserWuthSameUsername = await prismaClient.user.count({
      where: { username: registerRequest.username },
    });
    if (totalUserWuthSameUsername != 0) {
      throw new ResponseError(409, "Username Already exists");
    }
    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);
    const user = await prismaClient.user.create({
      data: registerRequest,
    });
    return toUserResponse(user);
  }
}
