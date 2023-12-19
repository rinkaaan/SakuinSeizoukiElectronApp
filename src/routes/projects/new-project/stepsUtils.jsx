import { Step1, Step1Validate } from "./steps/step1"
import { Step2 } from "./steps/step2"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { commonActions, commonSelector } from "../../../slices/commonSlice"
import { appDispatch } from "../../../common/store"
import { newProjectActions, newProjectSelector } from "../../../slices/newProjectSlice"

export const steps = [
  {
    title: "Open PDF",
    StepContent: Step1,
    validator: Step1Validate,
  },
  {
    title: "Annotate page regions",
    StepContent: Step2,
  },
]

export const i18nStrings = {
  submitButton: "Create book index",
  stepNumberLabel: stepNumber => `Step ${stepNumber}`,
  collapsedStepsLabel: (stepNumber, stepsCount) => `Step ${stepNumber} of ${stepsCount}`,
  cancelButton: "Cancel",
  previousButton: "Previous",
  nextButton: "Next",
}

export const useWizard = () => {
  const { latestStepIndex } = useSelector(newProjectSelector)
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const { dirty } = useSelector(commonSelector)
  const navigate = useNavigate()

  const setActiveStepIndexAndCloseTools = index => {
    setActiveStepIndex(index)
    if (index > latestStepIndex) {
      appDispatch(newProjectActions.updateSlice({ latestStepIndex: index }))
    }
  }

  const onNavigate = evt => {
    // const { requestedStepIndex, reason } = evt.detail
    // console.log(evt)
    // console.log(`Requested step index: ${requestedStepIndex}`)
    // setActiveStepIndexAndCloseTools(requestedStepIndex)

    // update to use validator
    const { requestedStepIndex, reason } = evt.detail
    const sourceStepIndex = requestedStepIndex - 1
    if (reason === "next") {
      if (steps[sourceStepIndex].validator()) {
        setActiveStepIndexAndCloseTools(requestedStepIndex)
      }
    } else {
      setActiveStepIndexAndCloseTools(requestedStepIndex)
    }
  }

  const onCancel = () => {
    if (!dirty) {
      navigate("/projects/all")
    } else {
      appDispatch(commonActions.updateSlice({ dirtyModalVisible: true, dirtyRedirectUrl: "/projects/all" }))
    }
  }

  const onSubmit = () => {
    console.log("Submit")
  }

  return {
    activeStepIndex,
    onNavigate,
    onCancel,
    onSubmit,
  }
}
