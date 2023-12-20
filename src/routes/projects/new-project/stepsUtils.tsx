import { Step1, validateStep1 } from "./steps/step1"
import { Step2 } from "./steps/step2"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { commonActions, commonSelector } from "../../../slices/commonSlice"
import { appDispatch } from "../../../common/store"
import { newProjectActions, newProjectSelector } from "../../../slices/newProjectSlice"
import { NonCancelableCustomEvent } from "@cloudscape-design/components"
import { WizardProps } from "@cloudscape-design/components/wizard/interfaces"

export const steps = [
  {
    title: "Open PDF",
    StepContent: Step1,
    validate: validateStep1,
  },
  {
    title: "Annotate page regions",
    StepContent: Step2,
  },
]

export const i18nStrings = {
  submitButton: "Create book index",
  stepNumberLabel: (stepNumber: number) => `Step ${stepNumber}`,
  collapsedStepsLabel: (stepNumber: number, stepsCount: number) => `Step ${stepNumber} of ${stepsCount}`,
  cancelButton: "Cancel",
  previousButton: "Previous",
  nextButton: "Next",
}

export const useWizard = () => {
  const { latestStepIndex } = useSelector(newProjectSelector)
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const { dirty } = useSelector(commonSelector)
  const navigate = useNavigate()

  function setActiveStepIndexAndCloseTools(index: number) {
    setActiveStepIndex(index)
    if (index > latestStepIndex) {
      appDispatch(newProjectActions.updateSlice({ latestStepIndex: index }))
    }
  }

  async function onNavigate(event: NonCancelableCustomEvent<WizardProps.NavigateDetail>) {
    const { requestedStepIndex, reason } = event.detail
    const sourceStepIndex = requestedStepIndex - 1
    if (reason === "next") {
      appDispatch(newProjectActions.updateSlice({ isLoadingNextStep: true }))
      const isValid = await steps[sourceStepIndex].validate()
      appDispatch(newProjectActions.updateSlice({ isLoadingNextStep: false }))
      if (isValid) {
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