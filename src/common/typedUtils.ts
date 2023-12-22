import { format, isToday, isYesterday, parseISO } from "date-fns"
import { v4 } from "uuid"
import { io, Socket } from "socket.io-client"
import { appDispatch } from "./store"
import { mainActions } from "../routes/mainSlice"

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
  socket: Socket | null = null

  connect(port: number) {
    if (this.socket == null) {
      this.socket = io(`http://127.0.0.1:${port}`, {
        reconnectionDelayMax: 100,
      })
      this.socket.on("connect", () => {
        appDispatch(mainActions.updateSlice({ engineReady: true }))
      })
    }
  }

  isConnected() {
    return this.socket?.connected
  }
}
