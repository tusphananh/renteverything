import { Context } from '../types/Context'
import { MiddlewareFn } from 'type-graphql'
import { AuthenticationError } from 'apollo-server-express'
// import User from '../entities/User'
// import argon2 from "argon2";

export const checkAuth: MiddlewareFn<Context> = async (
    { context: { req } },
    next
) => {
    if (!req.session.userId) {
        throw new AuthenticationError(
            'Not authenticated to perform GraphQL operations'
        )
    }
    return next()
}
