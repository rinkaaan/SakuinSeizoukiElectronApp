import { Step1, validateStep1 } from "./step1/Step1"
import { Step2, validateStep2 } from "./step2/Step2"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getIndex, createIndexActions, createIndexSelector } from "./createIndexSlice"
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
    // title: "Open PDF",
    title: "PDFを開く",
    StepContent: Step1,
    validate: validateStep1,
    // description: "This step cannot be modified once you proceed.",
    description: "このステップは、進行すると変更できなくなります。",
  },
  {
    // title: "Annotate page regions",
    title: "ページ領域を注釈",
    StepContent: Step2,
    validate: validateStep2,
  },
  {
    // title: "Open word list",
    title: "単語リストを開く",
    StepContent: Step3,
    validate: validateStep3,
  },
  {
    // title: "Download index",
    title: "索引をダウンロード",
    StepContent: Step4,
  },
]

export const i18nStrings = {
  // submitButton: "Download index",
  submitButton: "索引をダウンロード",
  stepNumberLabel: (stepNumber: number) => `Step ${stepNumber}`,
  // collapsedStepsLabel: (stepNumber: number, stepsCount: number) => `Step ${stepNumber} of ${stepsCount}`,
  collapsedStepsLabel: (stepNumber: number, stepsCount: number) => `ステップ ${stepNumber} / ${stepsCount}`,
  // cancelButton: "Start over",
  cancelButton: "最初からやり直す",
  // previousButton: "Previous",
  previousButton: "前へ",
  // nextButton: "Next",
  nextButton: "次へ",
}

export const useWizard = () => {
  const { latestStepIndex } = useSelector(createIndexSelector)
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const { dirty } = useSelector(mainSelector)
  const navigate = useNavigate()

  function setActiveStepIndexAndCloseTools(index: number) {
    setActiveStepIndex(index)
    if (index > latestStepIndex) {
      appDispatch(createIndexActions.updateSlice({ latestStepIndex: index }))
    }
  }

  async function onNavigate(event: NonCancelableCustomEvent<WizardProps.NavigateDetail>) {
    const { requestedStepIndex, reason } = event.detail
    const sourceStepIndex = requestedStepIndex - 1
    if (reason === "next") {
      appDispatch(createIndexActions.updateSlice({ isLoadingNextStep: true }))
      if (steps[sourceStepIndex].validate) {
        const isValid = await steps[sourceStepIndex].validate()
        if (isValid) {
          setActiveStepIndexAndCloseTools(requestedStepIndex)
        }
      } else {
        setActiveStepIndexAndCloseTools(requestedStepIndex)
      }
      appDispatch(createIndexActions.updateSlice({ isLoadingNextStep: false }))
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
  return `${OpenAPI.BASE || apiBase}/pdf/page-image?pdf_path=${encodeURIComponent(pdfPath)}&page_number=${pageNumber}`
}
