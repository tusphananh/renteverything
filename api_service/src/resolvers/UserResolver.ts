import argon2 from "argon2";
import fs from "fs";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import path from "path";
import { finished } from "stream/promises";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { SESSION_COOKIE_NAME } from "../configs/CookieConstants";
import { uploadFolder } from "../configs/FolderConstants";
import User from "../entities/User";
import { checkAuth } from "../middlewares/checkAuth";
import { Context } from "../types/Context";
import { ErrorResponse } from "../types/ErrorResponse";
import { UserResponse } from "../types/UserResponse";
import { isLoginFormValid, isRegisterFormValid } from "../utils/inputValidator";
const serverErrors: ErrorResponse = {
  field: "server",
  message: "Server error",
};
@Resolver()
export class UserResolver {
  /**
   * Register a new user
   */

  @Mutation(() => UserResponse, { nullable: true })
  async register(
    @Arg("phone") phone: string,
    @Arg("password") password: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    try {
      let registerError = isRegisterFormValid(phone, password, firstName, lastName);
      if (registerError.length > 0) {
        return {
          code: 400,
          success: false,
          errors: registerError,
        };
      }

      // Check existing user then create new user
      const user = await User.findOne({ phone: phone });
      if (user) {
        registerError = [{
          field: "phone",
          message: "Phone number already exists",
        }]
        const rs = {
          code: 400,
          success: false,
          errors: registerError,
        };

        return rs;
      }

      // hash password with argon2
      const hashedPassword = await argon2.hash(password);
      const newUser = await User.create({
        phone: phone,
        password: hashedPassword,
        firstName,
        lastName,
        rentActivities: [],
        provideActivities: [],
        items: [],
        balance: 0,
        messages: [],
      }).save();

      const rs = {
        code: 200,
        success: true,
        data: newUser,
      };

      // Create session
      req.session.userId = rs.data.id;

      return rs;
    } catch (error) {
      console.log(error);

      return {
        code: 500,
        success: false,
        errors: [serverErrors],
      };
    }
  }

  /**
   * Login for user by Query
   */

  @Mutation(() => UserResponse, { nullable: true })
  async login(
    @Arg("phone") phone: string,
    @Arg("password") password: string,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    try {
      let loginError = isLoginFormValid(phone, password);
      if (loginError.length > 0) {
        return {
          code: 400,
          success: false,
          errors: loginError,
        };
      }

      const user = await User.findOne({ phone: phone });
      if (!user) {
        loginError = [{
          field: "phone",
          message: "Wrong phone number or password",
        }]
        return {
          code: 400,
          success: false,
          errors: loginError,
        };
      }

      const isValid = await argon2.verify(user.password, password);
      if (!isValid) {
        loginError = [{
          field: "phone",
          message: "Wrong phone number or password",
        }]
        return {
          code: 400,
          success: false,
          errors: loginError,
        };
      }

      // Create Successful Login response
      const rs = {
        code: 200,
        success: true,
        data: user,
      };

      // Create session
      req.session.userId = rs.data.id;
      return rs;
    } catch (error) {
      console.log(error);

      return {

        code: 500,
        success: false,
        errors: [serverErrors],

      };
    }
  }

  /**
   * Logout for user by Query
   */
  @Mutation(() => UserResponse, { nullable: true })
  async logout(@Ctx() { req, res }: Context): Promise<UserResponse> {
    try {
      // Delete session
      res.clearCookie(SESSION_COOKIE_NAME);
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          return {
            code: 400,
            success: false,
            errors: [serverErrors],
          };
        }
        return;
      });

      return {
        code: 200,
        success: true,
      };
    } catch (error) {

      console.log(error);
      return {
        code: 500,
        success: false,
        errors: [serverErrors],
      };
    }
  }

  /**
 * Refresh user session
 */
  @Query(() => UserResponse, { nullable: true })
  @UseMiddleware(checkAuth)
  async refreshSession(@Ctx() { req }: Context): Promise<UserResponse> {
    try {
      const user = await User.findOne({ id: req.session.userId });
      if (!user) {
        const errors: ErrorResponse[] = [{
          field: "session",
          message: "Session expired",
        }]
        return {
          code: 400,
          success: false,
          errors: errors,
        };
      }
      req.session.touch();
      return {
        code: 200,
        success: true,
        data: user,
      }
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        success: false,
        errors: [serverErrors],
      };
    }
  }

  /**
   * Check user already have session
   */
  @Query(() => UserResponse, { nullable: true })
  async checkSession(@Ctx() { req }: Context): Promise<UserResponse> {
    try {

      const user = await User.findOne({ id: req.session.userId });
      if (!user) {
        const errors: ErrorResponse[] = [{
          field: "session",
          message: "Session expired",
        }]
        return {
          code: 400,
          success: false,
          errors: errors,
        };
      }

      return {
        code: 200,
        success: true,
        data: user,
      }
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        success: false,
        errors: [serverErrors],
      };
    }
  }

  /**
   * Add user balance
   */
  @Mutation(() => UserResponse, { nullable: true })
  @UseMiddleware(checkAuth)
  async addBalance(
    @Arg("amount") amount: number,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    try {
      const user = await User.findOne({ id: req.session.userId });
      if (!user) {
        const errors: ErrorResponse[] = [{
          field: "session",
          message: "Session expired",
        }]
        return {
          code: 400,
          success: false,
          errors: errors,
        };
      }

      user.balance += amount;
      await user.save();

      return {
        code: 200,
        success: true,
        data: user,
      }
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        success: false,
        errors: [serverErrors],
      };
    }
  }

  /**
   * Subtract user balance
   */
  @Mutation(() => UserResponse, { nullable: true })
  @UseMiddleware(checkAuth)
  async subtractBalance(
    @Arg("amount") amount: number,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    try {
      const user = await User.findOne({ id: req.session.userId });
      if (!user) {
        const errors: ErrorResponse[] = [{
          field: "session",
          message: "Session expired",
        }]
        return {
          code: 400,
          success: false,
          errors: errors,
        };
      }

      user.balance -= amount;
      await user.save();

      return {
        code: 200,
        success: true,
        data: user,
      }
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        success: false,
        errors: [serverErrors],
      };
    }
  }

  /**
   * Upload image of ID
   */
  @Mutation(() => UserResponse, { nullable: true })
  @UseMiddleware(checkAuth)
  async uploadIdImage(
    @Arg("frontSide", () => GraphQLUpload) frontSide: FileUpload,
    @Arg("backSide", () => GraphQLUpload) backSide: FileUpload,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    try {
      const user = await User.findOne({ id: req.session.userId });
      if (!user) {
        const errors: ErrorResponse[] = [{
          field: "session",
          message: "Session expired",
        }]
        return {
          code: 400,
          success: false,
          errors: errors,
        };
      }

      //Get the image type is jpg or png
      const imageType = frontSide.filename.split(".")[1];

      // Name the frontSide image with user id and backSide image with user id
      const frontSideName = `${user.id}_frontSide.${imageType}`;
      const backSideName = `${user.id}_backSide.${imageType}`;

      const frontStream = frontSide.createReadStream();
      const frontPath = path.join(uploadFolder, frontSideName)
      const frontOut = fs.createWriteStream(frontPath);
      frontStream.pipe(frontOut);
      await finished(frontOut);

      const backStream = backSide.createReadStream();
      const backPath = path.join(uploadFolder, backSideName)
      const backOut = fs.createWriteStream(backPath);
      backStream.pipe(backOut);
      await finished(backOut);

      // Save the exact file path to user
      user.frontIdImageFilePath = path.join(uploadFolder, frontSideName);
      user.backIdImageFilePath = path.join(uploadFolder, backSideName);
      user.isVerified = true;
      await user.save();

      return {
        code: 200,
        success: true,
        data: user,
      }
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        success: false,
        errors: [serverErrors],
      };
    }
  }

}

