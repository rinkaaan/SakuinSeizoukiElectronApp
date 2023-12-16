import { useEffect } from "react"

export function Component() {
  useEffect(() => {
    window.electron.sendAppDataDir("/Users/nguylinc/Desktop/sakuinseizouki")
  }, [])

  return (
    <div>
      <h2>Hello from React!</h2>
    </div>
  )
}
