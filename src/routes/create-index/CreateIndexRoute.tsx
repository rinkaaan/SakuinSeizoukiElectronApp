import { Wizard } from "@cloudscape-design/components"
import { i18nStrings, steps, useWizard } from "./stepsUtils"
import { newProjectActions, newProjectSelector } from "./newProjectSlice"
import { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import { WizardProps } from "@cloudscape-design/components/wizard/interfaces"
import { mainActions } from "../mainSlice"
import { appDispatch } from "../../common/store"

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

    return () => {
      appDispatch(mainActions.resetDirty())
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
