import { Alert, AppLayout, Box, Button, Flashbar, Modal, SideNavigation, SideNavigationProps, SpaceBetween, Spinner } from "@cloudscape-design/components"
import { Navigate, Outlet, UIMatch, useLocation, useMatches, useNavigate } from "react-router-dom"
import { Fragment, useEffect, useState } from "react"
import CloudBreadcrumbGroup from "../components/CloudBreadcrumbGroup"
import logo from "../assets/icon.png"
import { useSelector } from "react-redux"
import { commonActions, commonSelector, prepareNotifications, setAppDataDirectory } from "../slices/commonSlice"
import { appDispatch } from "../common/store"
import { OpenAPI } from "../../openapi-client"
import { CrumbHandle } from "../App"

const items: SideNavigationProps.Item[] = [
  {
    type: "link",
    text: "Projects",
    href: "/projects/all",
  },
  {
    type: "link",
    text: "Settings",
    href: "/settings",
  },
]

export function getCrumbs(matches: UIMatch<string, CrumbHandle>[]) {
  return matches
    .filter((match) => Boolean(match.handle?.crumbs))
    .map((match) => match.handle.crumbs())
}

export function BreadCrumbs() {
  const matches = useMatches() as UIMatch<string, CrumbHandle>[]
  const crumbs = getCrumbs(matches).map((crumb) => {
    return {
      text: crumb.crumb,
      href: crumb.path,
    }
  })
  const showCrumbs = crumbs.length > 1

  return (
    <div style={{ opacity: showCrumbs ? 1 : 0, pointerEvents: showCrumbs ? "auto" : "none" }}>
      <CloudBreadcrumbGroup items={crumbs}/>
    </div>
  )
}

export default function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const matches = useMatches() as UIMatch<string, CrumbHandle>[]
  const crumbs = getCrumbs(matches)
  const [activeHref, setActiveHref] = useState<string | undefined>(undefined)
  const { engineReady, navigationOpen, appDataDirectory, notifications, dirty, dirtyModalVisible, dirtyRedirectUrl } = useSelector(commonSelector)

  useEffect(() => {
    // Go from last to first crumb, set activeHref to the first one that matches items
    for (const crumb of crumbs.reverse()) {
      if (crumb.path == null) continue
      if (items.find(item => item["href"] === crumb.path)) {
        setActiveHref(crumb.path)
        break
      }
    }
  }, [crumbs])

  useEffect(() => {
    if (engineReady) {
      console.info(`Connected to engine at ${OpenAPI.BASE}`)
      const appDataDirectory = localStorage.getItem("app-data-directory")
      if (appDataDirectory) {
        appDispatch(setAppDataDirectory(appDataDirectory))
      }
    }
  }, [engineReady])

  if (!engineReady) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <SpaceBetween
          size="l"
          alignItems="center"
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "130px", height: "130px" }}
          />
          <Spinner size="big" />
        </SpaceBetween>
      </div>
    )
  } else if (appDataDirectory == null && location.pathname !== "/settings") {
    return (
      <Navigate
        to="/settings"
        replace={true}
      />
    )
  } else if (["/", "/projects"].includes(location.pathname)) {
    return <Navigate
      to="/projects/all"
      replace={true}
    />
  } else {
    return (
      <Fragment>
        <AppLayout
          navigation={
            <SideNavigation
              header={{
                text: "索引製造機",
                href: "/projects/all",
              }}
              onFollow={e => {
                e.preventDefault()
                if (!dirty) {
                  navigate(e.detail.href)
                } else {
                  appDispatch(commonActions.updateSlice({ dirtyModalVisible: true, dirtyRedirectUrl: e.detail.href }))
                }
              }}
              activeHref={activeHref}
              items={items}
            />
          }
          navigationHide={appDataDirectory == null}
          navigationOpen={navigationOpen}
          onNavigationChange={(e) => {
            appDispatch(commonActions.updateSlice({ navigationOpen: e.detail.open }))
          }}
          content={<Outlet/>}
          breadcrumbs={<BreadCrumbs/>}
          notifications={
            <Flashbar items={prepareNotifications(notifications)}/>
          }
          toolsHide
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
}
