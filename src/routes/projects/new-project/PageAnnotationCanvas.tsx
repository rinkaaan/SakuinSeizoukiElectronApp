import { useEffect, useRef, useState } from "react"
import Konva from "konva"
import { Image, Layer, Stage } from "react-konva"
import { SpaceBetween, Spinner, TextContent } from "@cloudscape-design/components"
import logo from "../../../assets/icon.png"

export default function PageAnnotationCanvas({
  imageUrl,
}: {
  imageUrl: string,
}) {
  const stageRef = useRef<Konva.Stage>(null)
  const [stageData, setStageData] = useState({ scale: 0.5, position: { x: 0, y: 0 } })
  const [imageObj, setImageObj] = useState(null)

  useEffect(() => {
    // Create an image object and set its source URL
    const img = new window.Image()
    img.src = imageUrl
    img.onload = () => {
      setImageObj(img)
    }
  }, [])

  function handleStageMouseWheel (e) {
    e.evt.preventDefault()
    // if deltaY is abnormally large then ignore it
    if (Math.abs(e.evt.deltaY) > 1000) return

    // if ctrl is not pressed, pan
    if (!e.evt.ctrlKey) {
      // if shift pressed, pan horizontally
      if (e.evt.shiftKey) {
        setStageData({
          ...stageData,
          position: {
            x: stageData.position.x - e.evt.deltaY,
            y: stageData.position.y,
          },
        })
      } else {
        setStageData({
          ...stageData,
          position: {
            x: stageData.position.x - e.evt.deltaX,
            y: stageData.position.y - e.evt.deltaY,
          },
        })
      }
      // else zoom
    } else {
      if (!stageRef.current) return
      const pointer = stageRef.current.getPointerPosition()
      const stage = stageRef.current.position()
      const scale = stageRef.current.scaleX()
      const pointerPosition = {
        x: (pointer.x - stage.x) / scale,
        y: (pointer.y - stage.y) / scale,
      }
      // calculate new scale
      const newScale = stageData.scale - e.evt.deltaY / 400 * stageData.scale
      // calculate new stage position so that viewport doesn't jump
      const newStagePosition = {
        x: pointer.x - pointerPosition.x * newScale,
        y: pointer.y - pointerPosition.y * newScale,
      }
      // limit max and min zoom
      if (newScale < 0.3 || newScale > 800) return
      setStageData({
        ...stageData,
        scale: newScale,
        position: newStagePosition,
      })
    }
  }

  if (!imageObj) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <SpaceBetween
          size="l"
          alignItems="center"
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "130px", height: "130px" }}
          />
          <Spinner size="big" />
          <TextContent>
            <p>Loading page...</p>
          </TextContent>
        </SpaceBetween>
      </div>
    )
  } else {
    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
        x={stageData.position.x}
        y={stageData.position.y}
        scale={{ x: stageData.scale, y: stageData.scale }}
        style={{ backgroundColor: "gray", position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
        onWheel={handleStageMouseWheel}
        // onMouseMove={handleStageMouseMove}
        // onMouseDown={handleStageMouseDown}
        // onMouseUp={handleStageMouseUp}
        // onMouseLeave={handleStageMouseLeave}
      >
        <Layer>
          <Image
            image={imageObj}
            x={0}
            y={0}
          />
        </Layer>
      </Stage>
    )
  }
}
