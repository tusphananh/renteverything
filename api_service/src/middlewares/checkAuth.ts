import { Context } from '../types/Context'
import { MiddlewareFn } from 'type-graphql'
import { AuthenticationError } from 'apollo-server-express'
import User from '../entities/User'
import argon2 from "argon2";

export const checkAuth: MiddlewareFn<Context> = async (
    { context: { req } },
    next
) => {

    if (!req.session.userId) {
        // Get Basic Auth Token from Header and check if it is valid
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            throw new AuthenticationError(
                'Not authenticated to perform GraphQL operations'
            )
        }
        // Get User and Password from Token
        const phone = token.split(':')[0]
        const password = token.split(':')[1]
        // Check if User and Password are valid
        const user = await User.findOne({ phone: phone });
        if (!user) {
            throw new AuthenticationError(
                'Not authenticated to perform GraphQL operations'
            )
        }

        const isValid = await argon2.verify(user.password, password);
        if (!isValid) {
            throw new AuthenticationError(
                'Not authenticated to perform GraphQL operations'
            )
        }

        // Set UserId to Session
        req.session.userId = user.id

    }

    return next()
}
