import { io } from "socket.io-client"

export const socket = io("http://127.0.0.1:34200")

socket.on("connect", () => {
  console.log("connected to engine")
})

socket.on("connect_error", (err) => {
  console.log("connect_error:", err)
})
