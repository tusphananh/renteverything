import { SearchItem } from "../constants/SearchConstants"
import { addRedisObjectValue, getAllRedisKeys, getRedisObjectValue, removeRedisValue } from "../libs/redis"

export default class Search {

    static create = (search: SearchItem) => {
        addRedisObjectValue(search.id, search)
    }

    static get = (id: string) => {
        return getRedisObjectValue(id)
    }

    static getAll = () => {
        return getAllRedisKeys()
    }

    static remove = (id: string) => {
        removeRedisValue(id)
    }

}


