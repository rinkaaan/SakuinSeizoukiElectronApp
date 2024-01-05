import React from "react"
import { Box, Header, Pagination, SpaceBetween, Table } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { createIndexSelector } from "../createIndexSlice"
import { useCollection } from "@cloudscape-design/collection-hooks"

export function MissingPagesTable() {
  const { createIndexOut } = useSelector(createIndexSelector)
  const missingPages = createIndexOut?.missing_pages || []
  const { items, paginationProps, collectionProps } = useCollection(
    missingPages,
    {
      filtering: {},
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    },
  )

  return createIndexOut?.missing_pages && (
    <Box margin={{ bottom: "l" }}>
      <SpaceBetween size="l">
        <Table
          {...collectionProps}
          pagination={<Pagination {...paginationProps} />}
          items={items}
          columnDefinitions={[
            {
              id: "page",
              // header: "Page number",
              header: "ページ",
              cell: item => item,
              isRowHeader: true,
            },
          ]}
          variant="container"
          empty={
            <Box
              margin={{ vertical: "xs" }}
              textAlign="center"
              color="inherit"
            >
              <SpaceBetween size="m">
                {/*<b>No pages missing.</b>*/}
                <b>ページの欠落はない。</b>
              </SpaceBetween>
            </Box>
          }
          header={
            <Header counter={`(${missingPages.length})`}>
              {/*Missing pages*/}
              見つからないページ
            </Header>
          }
        />
      </SpaceBetween>
    </Box>
  )
}
