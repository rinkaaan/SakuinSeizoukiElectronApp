import UploadPdf from "./steps/step1.jsx"
import Details from "./steps/step2.jsx"
import Advanced from "./steps/step3.jsx"
import Review from "./steps/step4.jsx"
import { DEFAULT_STEP_INFO } from "./StepsConfig.jsx"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"

export const steps = [
  {
    title: "Upload PDF",
    stateKey: "uploadPdf",
    StepContent: UploadPdf,
  },
  {
    title: "Specify instance details",
    stateKey: "details",
    StepContent: Details,
  },
  {
    title: "Configure settings",
    stateKey: "advanced",
    StepContent: Advanced,
  },
  {
    title: "Review and create",
    stateKey: "review",
    StepContent: Review,
  },
]

export const i18nStrings = {
  submitButton: "Create DB instance",
  stepNumberLabel: stepNumber => `Step ${stepNumber}`,
  collapsedStepsLabel: (stepNumber, stepsCount) => `Step ${stepNumber} of ${stepsCount}`,
  cancelButton: "Cancel",
  previousButton: "Previous",
  nextButton: "Next",
}

export const useWizard = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [stepsInfo, setStepsInfo] = useState(DEFAULT_STEP_INFO)
  const navigate = useNavigate()

  const onStepInfoChange = useCallback(
    (stateKey, newStepState) => {
      setStepsInfo({
        ...stepsInfo,
        [stateKey]: {
          ...stepsInfo[stateKey],
          ...newStepState,
        },
      })
    },
    [stepsInfo],
  )

  const setActiveStepIndexAndCloseTools = index => {
    setActiveStepIndex(index)
  }

  const onNavigate = evt => {
    setActiveStepIndexAndCloseTools(evt.detail.requestedStepIndex)
  }

  const onCancel = () => {
    navigate("/projects/all")
  }

  const onSubmit = () => {
    console.log(stepsInfo)
  }

  return {
    activeStepIndex,
    stepsInfo,
    setActiveStepIndexAndCloseTools,
    onStepInfoChange,
    onNavigate,
    onCancel,
    onSubmit,
  }
}
