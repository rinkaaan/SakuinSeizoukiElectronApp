import { useEffect, useState } from "react"

export default function useDelayed() {
  const [isTrue, setIsTrue] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTrue(true)
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return isTrue
}
