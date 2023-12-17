import { commonSlice } from "../slices/commonSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { socketManager } from "../common/clients"

export default function MainLayoutError() {
  const navigate = useNavigate()
  const socket = socketManager.get()

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected")
      commonSlice.engineReady = true

      navigate("/", { replace: true })
    })

    return () => {
      socket.off("connect")
    }
  }, [])

  return (
    <h1>Loading...</h1>
  )
}
