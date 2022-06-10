import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { uuid } from 'uuidv4';
import Activity from "../entities/Activity";
import Chat from "../entities/Chat";
import Message from "../entities/Message";
import User from "../entities/User";
import { checkAuth } from "../middlewares/checkAuth";
import { ActivitiesResponse, ActivityResponse } from "../types/ActivityResponse";
import { Context } from "../types/Context";
import { ErrorResponse } from "../types/ErrorResponse";
import { ActivityStatus } from "../types/Status";
const serverErrors: ErrorResponse = {
    field: "server",
    message: "Server error",
};
@Resolver()
export class ActivityResolver {

    /**
     * Add new activity
     */
    @Mutation(() => ActivityResponse, { nullable: true })
    @UseMiddleware(checkAuth)
    async addActivity(
        @Arg("id") id: string,
        @Arg("name") name: string,
        @Arg("itemName") itemName: string,
        @Arg("itemDescription") itemDescription: string,
        @Arg("itemPrice") itemPrice: number,
        @Arg("itemRealValue") itemRealValue: number,
        @Arg("totalPrice") totalPrice: number,
        @Arg("duration") duration: number,
        @Arg("distance") distance: number,
        @Arg("providerId") providerId: string,
        @Arg("renterId") renterId: string,
    ): Promise<ActivityResponse | null> {
        try {
            const provider = await User.findOne({
                id: parseFloat(providerId),
            });

            const renter = await User.findOne({
                id: parseFloat(renterId),
            });

            if (!provider || !renter) {
                return {
                    code: 400,
                    success: false,
                    errors: [{
                        field: "user",
                        message: "User not found",
                    }],
                };
            }

            const activity = await Activity.create({
                id,
                name,
                status: ActivityStatus.PENDING,
                itemName,
                itemDescription,
                itemPrice,
                itemRealValue,
                totalPrice,
                duration,
                distance,
                provider,
                renter,
            }).save();


            // if (provider.provideActivities) {
            //     provider.provideActivities.push(activity);
            //     await provider.save();
            // } else provider.provideActivities = [activity];

            // if (renter.rentActivities) {
            //     renter.rentActivities.push(activity);
            //     await renter.save();
            // } else renter.rentActivities = [activity];

            /**
             * Add new activity chat
             */

            const chat = await Chat.create({
                messages: [],
                title: activity.name,
            }).save();

            const message = await Message.create({
                id: uuid(),
                chat,
                user: provider,
                text: `Hello, ${renter.firstName} ${renter.lastName}! I'm ${provider.firstName} ${provider.lastName} `,
            }).save();

            chat.messages.push(message);
            await chat.save();
            activity.chat = chat;
            await activity.save();

            return {
                code: 200,
                success: true,
                data: activity,
            }

        } catch (error) {
            console.log(error);

            return {
                code: 500,
                success: false,
                errors: [serverErrors],
            }
        }
    }

    /**
     * get all rent activities
     */

    @Query(() => ActivitiesResponse, { nullable: true })
    @UseMiddleware(checkAuth)

    async getRentActivities(
        @Ctx() { req }: Context,
    ): Promise<ActivitiesResponse | null> {
        try {
            const userId = req.session.userId;

            if (!userId) {
                return {
                    code: 400,
                    success: false,
                    errors: [{
                        field: "user",
                        message: "User not found",
                    }],
                };
            }

            const activities = await Activity.find({
                renter: {
                    id: userId,
                },
            });

            return {
                code: 200,
                success: true,
                data: activities,
            }


        } catch (error) {
            console.log(error);
            return {
                code: 500,
                success: false,
                errors: [serverErrors],
            }
        }
    }

    /**
     * get all provide activities
     */

    @Query(() => ActivitiesResponse, { nullable: true })
    @UseMiddleware(checkAuth)
    async getProvideActivities(
        @Ctx() { req }: Context,
    ): Promise<ActivitiesResponse | null> {
        try {
            const userId = req.session.userId;

            if (!userId) {
                return {
                    code: 400,
                    success: false,
                    errors: [{
                        field: "user",
                        message: "User not found",
                    }],
                };
            }

            const activities = await Activity.find({
                provider: {
                    id: userId,
                },
            });

            return {
                code: 200,
                success: true,
                data: activities,
            }

        } catch (error) {
            console.log(error);
            return {
                code: 500,
                success: false,
                errors: [serverErrors],
            }
        }
    }

    /**
     * Fail activity
     */

    @Mutation(() => ActivityResponse, { nullable: true })
    @UseMiddleware(checkAuth)
    async failActivity(
        @Arg("id") id: string,
    ): Promise<ActivityResponse | null> {
        try {

            const activity = await Activity.findOne({
                id,
            });

            if (!activity) {
                return {
                    code: 404,
                    success: false,
                    errors: [{
                        field: "id",
                        message: "Activity not found",
                    }],
                }
            }

            activity.status = ActivityStatus.FAILED;

            await activity.save();

            return {
                code: 200,
                success: true,
                data: activity,
            }

        } catch (error) {
            console.log(error);
            return {
                code: 500,
                success: false,
                errors: [serverErrors],
            }
        }
    }

    /**
     * Get all activity
     */



    /**
     * Success activity
     */

    @Mutation(() => ActivityResponse, { nullable: true })
    @UseMiddleware(checkAuth)
    async successActivity(
        @Arg("id") id: string,
    ): Promise<ActivityResponse | null> {
        try {

            const activity = await Activity.findOne({
                id,
            });

            if (!activity) {
                return {
                    code: 404,
                    success: false,
                    errors: [{
                        field: "id",
                        message: "Activity not found",
                    }],
                }
            }

            activity.status = ActivityStatus.SUCCESS;

            await activity.save();

            return {
                code: 200,
                success: true,
                data: activity,
            }

        } catch (error) {
            console.log(error);
            return {
                code: 500,
                success: false,
                errors: [serverErrors],
            }
        }
    }

    /**
     * In-Progress activity
     */

    @Mutation(() => ActivityResponse, { nullable: true })
    @UseMiddleware(checkAuth)
    async inProgressActivity(
        @Arg("id") id: string,
    ): Promise<ActivityResponse | null> {
        try {

            const activity = await Activity.findOne({
                id,
            });

            if (!activity) {
                return {
                    code: 404,
                    success: false,
                    errors: [{
                        field: "id",
                        message: "Activity not found",
                    }],
                }
            }

            activity.status = ActivityStatus.IN_PROGRESS;

            await activity.save();

            return {
                code: 200,
                success: true,
                data: activity,
            }

        } catch (error) {
            console.log(error);
            return {
                code: 500,
                success: false,
                errors: [serverErrors],
            }
        }
    }
}
