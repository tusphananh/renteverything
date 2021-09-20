import { ItemResponse, ItemsResponse } from "../types/ItemResponse";
import { Resolver, Arg, Mutation, Query, Ctx, UseMiddleware } from "type-graphql";
import Item from "../entities/Item";
import { Context } from "../types/Context";
import { checkAuth } from "../middlewares/checkAuth";
import { Like } from "typeorm";

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
    @Arg("imageUrl", { nullable: true }) imageUrl: string,
    @Arg("quantity", { nullable: true, defaultValue: 1 }) quantity: number,
    @Ctx() { req }: Context
  ): Promise<ItemResponse | null> {
    try {
      const userId = req.session.userId;

      const item = await Item.create({
        name,
        description,
        price,
        imageUrl,
        userId,
        quantity
      }).save();

      const rs = {
        code: 200,
        message: "Item added",
        success: true,
        data: item,
      }

      return rs;

    } catch (error) {
      console.log(error);
      const rs = {
        code: 500,
        message: "Internal Server Error",
        success: false,
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
    const userId = req.session.userId;
    try {
      const items = await Item.find({
        userId,
      });

      const rs = {
        code: 200,
        message: "Items found",
        success: true,
        data: items,
      }

      return rs;

    } catch (error) {
      console.log(error);
      const rs = {
        code: 500,
        message: "Internal Server Error",
        success: false,
      }

      return rs;
    }
  }

  /**
   * Get 1 item from the database by name
   * @param name
   */

  @Query(() => ItemsResponse, { nullable: true })
  async getItemsByName(@Arg("name") name: string): Promise<ItemsResponse | null> {
    try {
      const item = await Item.find({
        name : Like(`%${name}%`)
      });

      if (!item) {
        const rs = {
          code: 404,
          message: "Item Not Found",
          success: false,
         
        }

        return rs;
      }
      const rs = {
        code: 200,
        message: "Item found",
        success: true,
        data: item,
      }

      return rs;
    } catch (error) {
      console.log(error);
      const rs = {
        code: 500,
        message: "Internal Server Error",
        success: false,
      }

      return rs;
    }
  }

  /**
   * Update an item in the database by id
   * @param id
   */

  @Mutation(() => ItemResponse, { nullable: true })
  @UseMiddleware(checkAuth)
  async updateItem(
    @Arg("id") id: number,
    @Arg("name", { nullable: true }) name: string,
    @Arg("description", { nullable: true }) description: string,
    @Arg("price", { nullable: true }) price: number,
    @Arg("imageUrl", { nullable: true }) imageUrl: string,
    @Arg("quantity", { nullable: true }) quantity: number,
    @Ctx() { req }: Context
  ): Promise<ItemResponse | null> {
    try {
      const userId = req.session.userId;

      let item = await Item.findOne({
        id,
        userId,
      });

      if (!item) {
        const rs = {
          code: 404,
          message: "Item Not Found",
          success: false,
        }
        return rs;
      }

      item.name = name ? name : item.name;
      item.description = description ? description : item.description;
      item.price = price ? price : item.price;
      item.imageUrl = imageUrl ? imageUrl : item.imageUrl;
      item.quantity = quantity ? quantity : item.quantity;

      item = await item.save();

      const rs = {
        code: 200,
        message: "Item updated",
        success: true,
        data: item,
      }

      console.log(rs);

      return rs;

    } catch (error) {
      console.log(error);
      const rs = {
        code: 500,
        message: "Internal Server Error",
        success: false,
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
        id,
        userId
      });

      if (!item) {
        const rs = {
          code: 404,
          message: "Item Not Found",
          success: false,
        }
        return rs;
      }

      item.remove();

      const rs = {
        code: 200,
        message: "Item deleted",
        success: true,
        data: item,
      }

      return rs;

    } catch (error) {
      console.log(error);
      const rs = {
        code: 500,
        message: "Internal Server Error",
        success: false,
      }

      return rs;
    }
  }

}
