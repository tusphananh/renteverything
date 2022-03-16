import { ActivitiesStatus } from '../constants/ActivitiesConstants'

export const timeFormatter = (n: number) => {
  const sec = n
  const min = Math.floor(sec / 60)

  let secString =
    Math.floor(sec) === 1
      ? `${Math.floor(sec)} second`
      : `${Math.floor(sec)} seconds`
  let minString = min === 1 ? `${min} minute` : `${min} minutes`

  return min === 0 ? secString : minString
}
export const hourFormatter = (n: number) => {
  return n > 1 ? n + ' hours' : n + ' hour'
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getReverseActivityStatus = (status?: string) => {
  switch (status) {
    case ActivitiesStatus.SUCCESS:
      return ActivitiesStatus.SUCCESS
    case ActivitiesStatus.FAILED:
      return ActivitiesStatus.FAILED
    default:
      return ActivitiesStatus.PENDING
  }
}

/**
 * Convert 2022-01-09T01:54:36.707Z
 */

export const formatDate = (date: string) => {
  const d = new Date(date)
  const month = d.getMonth() + 1
  const day = d.getDate()
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Conver 2022-03-02T19:43:34.085Z to 19:43
 */

export const formatTime = (date: string) => {
  const d = new Date(date)
  const hours = d.getHours()
  const minutes = d.getMinutes()
  return `${hours}:${minutes}`
}
