import React from "react"
import { Button } from "@cloudscape-design/components"
import { getIndex } from "../newProjectSlice"
import { appDispatch } from "../../../common/store"

export function DownloadIndexButton() {
  function onClick() {
    appDispatch(getIndex())
  }

  return (
    <Button onClick={onClick}>Download</Button>
  )
}
