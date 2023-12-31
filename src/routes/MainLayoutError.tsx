import { useEffect } from "react"
import { useNavigate, useRouteError } from "react-router-dom"
import logo from "../assets/Icon.png"
import { SpaceBetween, Spinner } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { mainActions, mainSelector } from "./mainSlice"
import { appDispatch } from "../common/store"

export default function MainLayoutError() {
  const navigate = useNavigate()
  const { engineReady } = useSelector(mainSelector)
  const error = useRouteError()

  useEffect(() => {
    if (engineReady) {
      if (error) {
        console.error(error)
        const errorAny = error
        let errorMessage: string
        if (errorAny["error"]) {
          errorMessage = errorAny["error"].toString()
        } else {
          errorMessage = errorAny.toString()
        }
        appDispatch(
          mainActions.addNotification({
            type: "error",
            content: errorMessage,
          }),
        )
      }
      navigate("/", { replace: true })
    }
  }, [error, engineReady])

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
