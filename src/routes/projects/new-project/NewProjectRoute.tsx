import { Wizard } from "@cloudscape-design/components"
import { i18nStrings, steps, useWizard } from "./stepsUtils.jsx"
import { ActionFunctionArgs } from "react-router-dom"
import { ProjectService } from "../../../../openapi-client"
import { appDispatch } from "../../../common/store"
import { newProjectActions } from "../../../slices/newProjectSlice"

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData()
  const action = data.get("action")
  if (action === "open-pdf") {
    const path = await window.electron.selectPdf()
    if (!path) return null
    const openPdfOut = await ProjectService.postProjectNewPdf({ pdf_path: path })
    appDispatch(newProjectActions.updateSlice({ openPdfOut }))
  }
  return null
}

export function Component() {
  const {
    activeStepIndex,
    stepsInfo,
    setActiveStepIndexAndCloseTools,
    onStepInfoChange,
    onNavigate,
    onCancel,
    onSubmit,
  } = useWizard()

  const wizardSteps = steps.map(({ title, stateKey, StepContent }) => ({
    title,
    content: (
      <StepContent
        info={stepsInfo}
        onChange={newStepState => onStepInfoChange(stateKey, newStepState)}
        setActiveStepIndex={setActiveStepIndexAndCloseTools}
        setHelpPanelContent={() => {}}
      />
    ),
  }))

  return (
    <Wizard
      steps={wizardSteps}
      activeStepIndex={activeStepIndex}
      i18nStrings={i18nStrings}
      onNavigate={onNavigate}
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  )
}
