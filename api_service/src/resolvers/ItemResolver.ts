import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import Item from "../entities/Item";
import User from "../entities/User";
import { checkAuth } from "../middlewares/checkAuth";
import { Context } from "../types/Context";
import { ErrorResponse } from "../types/ErrorResponse";
import { ItemResponse, ItemsResponse } from "../types/ItemResponse";

const serverErrors: ErrorResponse = {
  field: "server",
  message: "Server error",
};
@Resolver()
export class ItemResolver {
  /**
   * Add Items to the database by the user
   * @param {number} userId
   */

  @Mutation(() => ItemResponse, { nullable: true })
  @UseMiddleware(checkAuth)
  async addItem(
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("price") price: number,
    @Arg("realValue") realValue: number,
    @Ctx() { req }: Context
  ): Promise<ItemResponse | null> {
    try {
      const owner = await User.findOne({
        id: req.session.userId,
      });

      if (!owner) {
        return {
          code: 404,
          success: false,
          errors: [{
            field: "user",
            message: "User not found",
          }],
        };
      }

      const item = await Item.create({
        name,
        description,
        price,
        realValue,
        owner
      }).save();

      const rs = {
        code: 200,
        success: true,
        data: item,
      }

      return rs;

    } catch (error) {
      console.log(error);
      const rs = {
        code: 500,
        success: false,
        errors: [serverErrors]
      }

      return rs;
    }
  }

  /**
   * Get all items from the database of 1 user
   * @param  userId
   */

  @Query(() => ItemsResponse, { nullable: true })
  @UseMiddleware(checkAuth)
  async getItems(
    @Ctx() { req }: Context
  ): Promise<ItemsResponse | null> {
    const owner = await User.findOne({
      id: req.session.userId,
    });

    if (!owner) {
      return {
        code: 404,
        success: false,
        errors: [{
          field: "user",
          message: "User not found",
        }],
      };
    }

    const items = owner.items;

    const rs = {
      code: 200,
      success: true,
      data: items,
    }

    return rs;

  }

  /**
   * Get 1 item from the database by name
   * @param name
   */

  @Query(() => ItemsResponse, { nullable: true })
  async getItemsByName(@Arg("name") name: string, @Ctx() { req }: Context): Promise<ItemsResponse | null> {
    try {
      const owner = await User.findOne({
        id: req.session.userId,
      });

      if (!owner) {
        return {
          code: 404,
          success: false,
          errors: [{
            field: "user",
            message: "User not found",
          }],
        };
      }

      const items = owner.items.filter(item => item.name.includes(name));

      const rs = {
        code: 200,
        success: true,
        data: items,
      }

      return rs;

    } catch (error) {
      console.log(error);
      const rs = {
        code: 500,
        success: false,
        errors: [serverErrors]
      }

      return rs;
    }
  }


  /**
   * Delete an item from the database by id
   * @param id
   */

  @Mutation(() => ItemResponse, { nullable: true })
  @UseMiddleware(checkAuth)
  async deleteItem(@Arg("id") id: number,
    @Ctx() { req }: Context
  ): Promise<ItemResponse | null> {
    try {
      const userId = req.session.userId;

      const item = await Item.findOne({
        id: id,
        owner: {
          id: userId
        }
      });

      if (!item) {
        const rs = {
          code: 404,
          success: false,
          errors: [{
            field: "id",
            message: "Item not found"
          }]
        }
        return rs;
      }

      item.remove();

      const rs = {
        code: 200,
        success: true,
        data: item,
      }

      return rs;

    } catch (error) {
      console.log(error);
      const rs = {
        code: 500,
        success: false,
        errors: [serverErrors]
      }

      return rs;
    }
  }

  /**
   * Update item from the database by id
   */

  @Mutation(() => ItemResponse, { nullable: true })
  @UseMiddleware(checkAuth)
  async updateItem(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("price") price: number,
    @Arg("realValue") realValue: number,
    @Ctx() { req }: Context
  ): Promise<ItemResponse | null> {
    try {
      const owner = await User.findOne({
        id: req.session.userId,
      });

      if (!owner) {
        return {
          code: 404,
          success: false,
          errors: [{
            field: "user",
            message: "User not found",
          }],
        };
      }

      const item = owner.items.find(item => item.id === id);

      if (!item) {
        return {
          code: 404,
          success: false,
          errors: [{
            field: "id",
            message: "Item not found",
          }],
        };
      }

      item.name = name;
      item.description = description;
      item.price = price;
      item.realValue = realValue;
      await item.save();

      const rs = {
        code: 200,
        success: true,
        data: item,
      }

      return rs;

    } catch (error) {
      console.log(error);
      const rs = {
        code: 500,
        success: false,
        errors: [serverErrors]
      }

      return rs;
    }
  }
}
