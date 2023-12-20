import { Wizard } from "@cloudscape-design/components"
import { i18nStrings, steps, useWizard } from "./stepsUtils"
import { appDispatch } from "../../../common/store"
import { newProjectActions, newProjectSelector } from "../../../slices/newProjectSlice"
import { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import { commonActions } from "../../../slices/commonSlice"
import { WizardProps } from "@cloudscape-design/components/wizard/interfaces"

export function Component() {
  const {
    activeStepIndex,
    onNavigate,
    onCancel,
    onSubmit,
  } = useWizard()
  const { isLoadingNextStep } = useSelector(newProjectSelector)

  const wizardSteps: WizardProps.Step[] = steps.map(({ title, StepContent }) => ({
    title,
    description: "Previous steps cannot be modified.",
    content: (
      <StepContent />
    ),
  }))

  useEffect(() => {
    appDispatch(newProjectActions.resetSlice())
    appDispatch(commonActions.updateSlice({ navigationOpen: false }))

    return () => {
      appDispatch(commonActions.resetDirty())
    }
  }, [])

  return (
    <Fragment>
      <Wizard
        steps={wizardSteps}
        activeStepIndex={activeStepIndex}
        i18nStrings={i18nStrings}
        onNavigate={onNavigate}
        onCancel={onCancel}
        onSubmit={onSubmit}
        isLoadingNextStep={isLoadingNextStep}
      />
    </Fragment>
  )
}
