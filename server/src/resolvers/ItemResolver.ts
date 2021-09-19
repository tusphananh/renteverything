import { ItemResponse, ItemsResponse } from "../types/ItemResponse";
import { Resolver, Arg, Mutation, Query } from "type-graphql";
import Item from "../entities/Item";

@Resolver()
export class ItemResolver {
  /**
   * Add Items to the database by the user
   * @param {number} userId
   */

  @Mutation(() => ItemResponse, { nullable: true })
  async addItem(
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("price") price: number,
    @Arg("imageUrl", { nullable: true }) imageUrl: string,
    @Arg("quantity", { nullable: true, defaultValue: 1 }) quantity: number,
    @Arg("userId") userId: number
  ): Promise<ItemResponse | null> {
    try {
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
   * Get all items from the database
   * @param {number} userId
   */

  @Query(() => ItemsResponse, { nullable: true })
  async getItems(@Arg("userId") userId: number): Promise<ItemsResponse | null> {
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
   * Get 1 item from the database by id
   * @param id
   */

  @Query(() => ItemResponse, { nullable: true })
  async getItem(@Arg("id") id: number): Promise<ItemResponse | null> {
    try {
      const item = await Item.findOne(id);
      const rs = {
        code: 200,
        message: "Item foundr",
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
