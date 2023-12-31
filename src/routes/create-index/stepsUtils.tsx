import { Step1, validateStep1 } from "./step1/Step1"
import { Step2, validateStep2 } from "./step2/Step2"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getIndex, newProjectActions, newProjectSelector } from "./newProjectSlice"
import { NonCancelableCustomEvent } from "@cloudscape-design/components"
import { WizardProps } from "@cloudscape-design/components/wizard/interfaces"
import { mainActions, mainSelector } from "../mainSlice"
import { appDispatch } from "../../common/store"
import { OpenAPI } from "../../../openapi-client"
import { Step3, validateStep3 } from "./step3/Step3"
import { Step4 } from "./step4/Step4"

interface Step {
  title: string
  StepContent: React.ComponentType
  validate?: () => Promise<boolean>
  description?: string
}

export const steps: Step[] = [
  {
    title: "Open PDF",
    StepContent: Step1,
    validate: validateStep1,
    description: "This step cannot be modified once you proceed.",
  },
  {
    title: "Annotate page regions",
    StepContent: Step2,
    validate: validateStep2,
  },
  {
    title: "Open word list",
    StepContent: Step3,
    validate: validateStep3,
  },
  {
    title: "Create index",
    StepContent: Step4,
  },
]

export const i18nStrings = {
  submitButton: "Download index",
  stepNumberLabel: (stepNumber: number) => `Step ${stepNumber}`,
  collapsedStepsLabel: (stepNumber: number, stepsCount: number) => `Step ${stepNumber} of ${stepsCount}`,
  cancelButton: "Start over",
  previousButton: "Previous",
  nextButton: "Next",
}

export const useWizard = () => {
  const { latestStepIndex } = useSelector(newProjectSelector)
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const { dirty } = useSelector(mainSelector)
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
      if (steps[sourceStepIndex].validate) {
        const isValid = await steps[sourceStepIndex].validate()
        if (isValid) {
          setActiveStepIndexAndCloseTools(requestedStepIndex)
        }
      } else {
        setActiveStepIndexAndCloseTools(requestedStepIndex)
      }
      appDispatch(newProjectActions.updateSlice({ isLoadingNextStep: false }))
    } else {
      setActiveStepIndexAndCloseTools(requestedStepIndex)
    }
  }

  const onCancel = () => {
    if (!dirty) {
      navigate("/reset")
    } else {
      appDispatch(mainActions.updateSlice({ dirtyModalVisible: true, dirtyRedirectUrl: "/reset" }))
    }
  }

  const onSubmit = () => {
    appDispatch(getIndex())
  }

  return {
    activeStepIndex,
    onNavigate,
    onCancel,
    onSubmit,
  }
}

export function getPage({
  pageNumber,
  pdfPath,
  apiBase,
}: {
  pageNumber: number
  pdfPath: string
  apiBase?: string
}) {
  if (!pdfPath) {
    throw new Error("pdfPath must be defined")
  }
  if (!OpenAPI.BASE && !apiBase) {
    throw new Error("OpenAPI.BASE or apiBase must be defined")
  }
  return `${OpenAPI.BASE || apiBase}/project/get/pdf/page?pdf_path=${encodeURIComponent(pdfPath)}&page_number=${pageNumber}`
}
