import { useEffect, useRef, useState } from "react"
import Konva from "konva"
import { Image, Layer, Rect, Stage } from "react-konva"
import { SpaceBetween, Spinner, TextContent } from "@cloudscape-design/components"
import useWindowSize from "../../../hooks/useWindowSize"
import useDelayed from "../../../hooks/useDelayed"
import { useSelector } from "react-redux"
import { appDispatch } from "../../../common/store"
import { currentPageTypeAnnotationsSelector, createIndexActions, createIndexSelector } from "../createIndexSlice"

export default function PageAnnotationCanvas({
  imageUrl,
  setLoading,
}: {
  imageUrl: string,
  setLoading: (loading: boolean) => void,
}) {
  const stageRef = useRef<Konva.Stage>(null)
  const [stageData, setStageData] = useState({ scale: 1, position: { x: 0, y: 0 } })
  const [imageObj, setImageObj] = useState(null)
  const { width, height } = useWindowSize()
  const isDelayed = useDelayed()
  const rectangles = useSelector(currentPageTypeAnnotationsSelector)
  const currentRectRef = useRef(null)
  const [currentRect, setCurrentRect] = useState(null)
  const layerRef = useRef<Konva.Layer>(null)
  const { currentColor } = useSelector(createIndexSelector)

  function getRelativePointerPosition () {
    const mousePosition = stageRef.current.getPointerPosition()
    const stagePosition = stageRef.current.position()
    const stageScale = stageRef.current.scaleX()
    const relativeMousePos = {
      x: Math.floor((mousePosition.x - stagePosition.x) / stageScale),
      y: Math.floor((mousePosition.y - stagePosition.y) / stageScale),
    }
    return relativeMousePos
  }

  function handleStageMouseDown () {
    const { x, y } = getRelativePointerPosition()
    currentRectRef.current = { x, y, width: 0, height: 0 }
  }

  function handleStageMouseUp () {
    if (currentRectRef.current) {
      const { x, y } = getRelativePointerPosition()
      const newRect = {
        ...currentRectRef.current,
        width: x - currentRectRef.current.x,
        height: y - currentRectRef.current.y,
      }
      appDispatch(createIndexActions.addPageTypeAnnotation(newRect))
      currentRectRef.current = null
      setCurrentRect(null)
    }
  }

  function handleStageMouseMove () {
    if (currentRectRef.current) {
      const { x, y } = getRelativePointerPosition()
      currentRectRef.current.width = x - currentRectRef.current.x
      currentRectRef.current.height = y - currentRectRef.current.y
      setCurrentRect(
        <Rect
          x={currentRectRef.current.x}
          y={currentRectRef.current.y}
          width={currentRectRef.current.width}
          height={currentRectRef.current.height}
          fill="transparent"
          stroke={currentColor}
          strokeWidth={1}
        />
      )
    }
  }

  useEffect(() => {
    setLoading(true)
    // Create an image object and set its source URL
    const img = new window.Image()
    img.src = imageUrl
    img.onload = () => {
      setImageObj(img)
      setLoading(false)
    }
  }, [imageUrl])

  function onMouseWheel (e) {
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

  if (!imageObj && isDelayed) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <SpaceBetween
          size="l"
          alignItems="center"
        >
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
        width={width}
        height={height}
        ref={stageRef}
        x={stageData.position.x}
        y={stageData.position.y}
        scale={{ x: stageData.scale, y: stageData.scale }}
        style={{ backgroundColor: "#808080", position: "absolute", width: "100%", height: "100%", top: 0, left: 0, cursor: "crosshair" }}
        onWheel={onMouseWheel}
        onMouseDown={handleStageMouseDown}
        onMouseUp={handleStageMouseUp}
        onMouseMove={handleStageMouseMove}
      >
        <Layer ref={layerRef}>
          <Image
            image={imageObj}
            x={0}
            y={0}
          />
           {rectangles.map((rect, i) => (
            <Rect
              key={i}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              strokeWidth={1}
              fill="transparent"
              stroke={rect.color}
            />
          ))}
          {currentRect}
        </Layer>
      </Stage>
    )
  }
}
