import { commonSlice } from "../slices/commonSlice"
import { useEffect } from "react"
import { socket } from "../common/clients"
import { useNavigate } from "react-router-dom"

export default function MainLayoutError() {
  const navigate = useNavigate()

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
