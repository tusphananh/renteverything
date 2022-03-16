
export type MessageMaybe = {
    __typename?: 'Message'
    id: string
    createdAt: any
    text: string
    chatId: number
    user: {
        __typename?: 'User'
        id: string
        firstName: string
        lastName: string
        phone: string
    }
} | null