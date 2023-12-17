import React from "react"
import { Box, Container, Header, SpaceBetween } from "@cloudscape-design/components"
import CloudButton from "../../../../components/CloudButton"
import { Form } from "react-router-dom"

// const Pdf = () => {
//   const [value, setValue] = React.useState([])
//
//   return (
//     <FormField
//       label='Source PDF'
//       description='Upload PDF of the book you want to index'
//     >
//       <FileUpload
//         onChange={({ detail }) => setValue(detail.value)}
//         value={value}
//         i18nStrings={{
//           uploadButtonText: () => 'Choose file',
//           dropzoneText: e =>
//             e
//               ? 'Drop files to upload'
//               : 'Drop file to upload',
//           removeFileAriaLabel: e =>
//             `Remove file ${e + 1}`,
//           limitShowFewer: 'Show fewer files',
//           limitShowMore: 'Show more files',
//           errorIconAriaLabel: 'Error',
//         }}
//         showFileLastModified
//         showFileSize
//         showFileThumbnail
//         tokenLimit={3}
//         constraintText='Only one PDF file can be uploaded'
//       />
//     </FormField>
//   )
// }

const UploadPdf = ({ info: { uploadPdf }, onChange }) => {
  const { pdf } = uploadPdf
  // const onEngineOptionChange = getFieldOnChange('tile', 'engineOption', onChange)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  const childProps = { pdf, onChange }
  return (
    <Box margin={{ bottom: "l" }}>
      <SpaceBetween size='l'>
        <Container header={<Header variant='h2'>Upload file</Header>}>
          {/*<Pdf/>*/}
          <Form method='POST'>
            <CloudButton formAction='submit'>Choose file</CloudButton>
            <input type='hidden' name='action' value='upload-pdf'/>
          </Form>
        </Container>
        <Container header={<Header variant='h2'>Annotate text region</Header>}>
          <div>
            Fake region here
          </div>
        </Container>
      </SpaceBetween>
    </Box>
  )
}

export default UploadPdf
