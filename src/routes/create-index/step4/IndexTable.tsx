import React from "react"
import { Box, Header, Pagination, SpaceBetween, Table } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import { createIndexSelector } from "../createIndexSlice"
import { useCollection } from "@cloudscape-design/collection-hooks"

export function IndexTable() {
  const { createIndexOut } = useSelector(createIndexSelector)
  const wordPages = createIndexOut?.word_pages || []
  const { items, paginationProps, collectionProps } = useCollection(
    wordPages,
    {
      filtering: {},
      pagination: { pageSize: 10 },
      sorting: {},
      selection: {},
    },
  )

  return (
    <Box margin={{ bottom: "l" }}>
      <SpaceBetween size="l">
        <Table
          {...collectionProps}
          pagination={<Pagination {...paginationProps} />}
          items={items}
          columnDefinitions={[
            {
              id: "word",
              // header: "Word",
              header: "言葉",
              cell: item => item.word,
              isRowHeader: true,
            },
            {
              id: "pages",
              // header: "Pages",
              header: "ページ",
              cell: item => item.pages.join(", "),
              width: "100%",
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
                {/*<b>No words</b>*/}
                <b>単語が見つかりません</b>
              </SpaceBetween>
            </Box>
          }
          header={
            <Header counter={`(${wordPages.length})`}>
              {/*Index*/}
              索引
            </Header>
          }
        />
      </SpaceBetween>
    </Box>
  )
}
