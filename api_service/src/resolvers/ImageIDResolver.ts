import fs from "fs";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import User from "../entities/User";
import { checkAuth } from "../middlewares/checkAuth";
import { Context } from "../types/Context";
import { ErrorResponse } from "../types/ErrorResponse";
import { ImageIDResponse } from "../types/ImageIDResponse";
const serverErrors: ErrorResponse = {
    field: "server",
    message: "Server error",
};

@Resolver()
export class ImageIDResolver {
    /**
       * Get frontSide and backSide image of ID
       */
    @Query(() => ImageIDResponse, { nullable: true })
    @UseMiddleware(checkAuth)
    async getImageId(@Ctx() { req }: Context): Promise<ImageIDResponse> {
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

            // Get img path and return file
            const frontSidePath = user.frontIdImageFilePath;
            const backSidePath = user.backIdImageFilePath;

            if (!frontSidePath || !backSidePath) {
                return {
                    code: 400,
                    success: false,
                    errors: [{
                        field: "idImage",
                        message: "ID image not found",
                    }],
                };
            }

            const frontSide = fs.readFileSync(frontSidePath);
            const backSide = fs.readFileSync(backSidePath);
            const frontSideBase64 = frontSide.toString("base64");
            const backSideBase64 = backSide.toString("base64");
            return {
                code: 200,
                success: true,
                data: {
                    frontSide: frontSideBase64,
                    backSide: backSideBase64,
                },
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