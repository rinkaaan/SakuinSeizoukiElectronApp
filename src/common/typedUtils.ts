import { format, isToday, isYesterday, parseISO } from "date-fns"
import { v4 } from "uuid"
import { io, Socket } from "socket.io-client"

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

export class SocketManager {
  private socket: Socket | null = null

  connect(port: number) {
    if (this.socket !== null) {
      this.socket.disconnect()
    }

    this.socket = io(`http://127.0.0.1:${port}`, {
      reconnectionDelayMax: 100,
    })
  }

  get() {
    if (this.socket === null) {
      throw new Error("Socket is not connected")
    }
    return this.socket
  }
}
