import React from "react"
import { Alert, Box, SpaceBetween } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { createIndexSelector } from "../createIndexSlice"
import { MissingWordsTable } from "./MissingWordsTable"
import { MissingPagesTable } from "./MissingPagesTable"
import { IndexTable } from "./IndexTable"

export function Step4() {
  const { createIndexOut } = useSelector(createIndexSelector)

  return (
    <Box margin={{ bottom: "l" }}>
      <SpaceBetween size="l">
        {createIndexOut?.missing_words && (
          <Alert type="warning" statusIconAriaLabel="Warning">
            {/*No pages were found for the words below.*/}
            以下の単語に該当するページは見つかりませんでした。
          </Alert>
        )}
        <MissingWordsTable />
        {createIndexOut?.missing_pages && (
          <Alert type="warning" statusIconAriaLabel="Warning">
            {/*No pages were found for the page numbers below.*/}
            以下のページ番号に該当するページは見つかりませんでした。
          </Alert>
        )}
        <MissingPagesTable />
        <IndexTable />
      </SpaceBetween>
    </Box>
  )
}
