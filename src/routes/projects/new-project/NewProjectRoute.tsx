import { Alert, Box, Button, Modal, SpaceBetween, Wizard } from "@cloudscape-design/components"
import { i18nStrings, steps, useWizard } from "./stepsUtils.jsx"
import { ActionFunctionArgs, useNavigate } from "react-router-dom"
import { appDispatch } from "../../../common/store"
import { newProjectActions, newProjectSelector } from "../../../slices/newProjectSlice"
import { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import { commonActions, commonSelector } from "../../../slices/commonSlice"
import { OpenAPI } from "../../../../openapi-client"

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData()
  const action = data.get("action")
  if (action === "open-pdf") {
    const pdfPath = await window.electron.selectPdf()
    if (!pdfPath) return null
    const pageImage = `${OpenAPI.BASE}/project/get/pdf/page?pdf_path=${encodeURIComponent(pdfPath)}&page_number=1`
    appDispatch(newProjectActions.updateSlice({ pdfPath, pageImage }))
  }
  return null
}

export function Component() {
  const {
    activeStepIndex,
    onNavigate,
    onCancel,
    onSubmit,
  } = useWizard()
  const navigate = useNavigate()
  const { dirtyModalVisible, dirtyRedirectUrl } = useSelector(commonSelector)
  const { isLoadingNextStep } = useSelector(newProjectSelector)

  const wizardSteps = steps.map(({ title, StepContent }) => ({
    title,
    content: (
      <StepContent />
    ),
  }))

  useEffect(() => {
    appDispatch(newProjectActions.resetSlice())

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
      <Modal
        visible={dirtyModalVisible}
        header="Leave page"
        closeAriaLabel="Close modal"
        onDismiss={() => {
          appDispatch(commonActions.updateSlice({ dirtyModalVisible: false }))
        }}
        footer={
          <Box float="right">
            <SpaceBetween direction="horizontal" size="xs">
              <Button
                variant="link"
                onClick={() => {
                  appDispatch(commonActions.updateSlice({ dirtyModalVisible: false }))
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate(dirtyRedirectUrl)}
              >
                Leave
              </Button>
            </SpaceBetween>
          </Box>
        }
      >
        <Alert type="warning" statusIconAriaLabel="Warning">
          Are you sure that you want to leave the current page? The changes that you made won't be saved.
        </Alert>
      </Modal>
    </Fragment>
  )
}
