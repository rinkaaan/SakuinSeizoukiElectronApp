import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../assets/icon.png"
import { SpaceBetween, Spinner } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { commonSelector } from "../slices/commonSlice"

export default function MainLayoutError() {
  const navigate = useNavigate()
  const { engineReady } = useSelector(commonSelector)

  useEffect(() => {
    if (engineReady) {
      navigate("/", { replace: true })
    }
  }, [engineReady])

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
