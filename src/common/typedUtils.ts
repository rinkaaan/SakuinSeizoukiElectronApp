import { format, isToday, isYesterday, parseISO } from "date-fns"
import { v4 } from "uuid"

export function formatDate(inputDate?: string) {
  if (!inputDate) return null
  const parsedDate = parseISO(inputDate)

  if (isToday(parsedDate)) {
    return format(parsedDate, "'Today at' h:mm a")
  } else if (isYesterday(parsedDate)) {
    return format(parsedDate, "'Yesterday at' h:mm a")
  } else {
    return format(parsedDate, "MMM d, yyyy 'at' h:mm a")
  }
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function uuid() {
  return v4()
}
