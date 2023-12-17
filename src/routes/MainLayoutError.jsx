import { commonSlice } from "../slices/commonSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { socketManager } from "../common/clients"
import logo from "../assets/icon.png"
import { SpaceBetween, Spinner } from "@cloudscape-design/components"

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
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <SpaceBetween size="l" alignItems="center">
        <img
          src={logo}
          alt="logo"
          style={{ width: "130px", height: "130px" }}
        />
        <Spinner size="big" />
      </SpaceBetween>
    </div>
  )
}
