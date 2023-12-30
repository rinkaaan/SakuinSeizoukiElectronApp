import { Box, Button, Modal, SpaceBetween } from "@cloudscape-design/components"
import CloudButton from "../../../components/CloudButton"
import CloudInput from "../../../components/CloudInput"
import { createRef, FormEvent } from "react"

export default function GoToPageModal({
  onGetSpecificPage,
  open,
  onClose,
}: {
  onGetSpecificPage: (pageNumber: number) => void,
  open: boolean,
  onClose: () => void,
}) {
  const formRef = createRef<HTMLFormElement>()

  function onSubmitGoToPage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const pageNumber = Number(formData.get("page-number"))
    if (isNaN(pageNumber)) return
    onGetSpecificPage(pageNumber)
    onClose()
    formRef.current?.reset()
  }

  return (
    <Modal
        onDismiss={() => onClose()}
        visible={open}
        header="Go to page"
        footer={
          <Box float="right">
            <SpaceBetween
              direction="horizontal"
              size="xs"
            >
              <Button
                variant="link"
                onClick={() => onClose()}
              >Cancel</Button>
              <CloudButton
                form="go-to-page-form"
                formAction="submit"
                variant="primary"
              >Go</CloudButton>
            </SpaceBetween>
          </Box>
        }
      >
        <form
          id="go-to-page-form"
          onSubmit={onSubmitGoToPage}
          ref={formRef}
        >
          <CloudInput
            name="page-number"
            placeholder="Enter page number"
          />
        </form>
      </Modal>
  )
}
