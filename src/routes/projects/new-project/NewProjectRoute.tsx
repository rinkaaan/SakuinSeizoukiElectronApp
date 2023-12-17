import { Wizard } from "@cloudscape-design/components"
import { steps, useWizard, i18nStrings } from "./stepsUtils.jsx"
import { ActionFunctionArgs } from "react-router-dom"
// import { PdfService } from "../../../../openapi-client"

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData()
  const action = data.get("action")
  if (action === "upload-pdf") {
    // PdfService.postPdf()
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
