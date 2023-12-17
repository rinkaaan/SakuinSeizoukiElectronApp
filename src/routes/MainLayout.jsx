import { AppLayout, Flashbar, SideNavigation } from "@cloudscape-design/components"
import { Navigate, Outlet, useLocation, useMatches, useNavigate, useRevalidator } from "react-router-dom"
import { useEffect, useState } from "react"
import CloudBreadcrumbGroup from "../components/CloudBreadcrumbGroup"
import { commonSlice } from "../slices/commonSlice.ts"
import { socket } from "../common/clients"

const items = [
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

export function getCrumbs(matches) {
  return matches
    .filter((match) => Boolean(match.handle?.crumbs))
    .map((match) => match.handle.crumbs())
}

export function BreadCrumbs() {
  const matches = useMatches()
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
  const matches = useMatches()
  const crumbs = getCrumbs(matches)
  const revalidator = useRevalidator()
  const [activeHref, setActiveHref] = useState()
  const [navigationOpen, setNavigationOpen] = useState(commonSlice.navigationOpen)
  const { engineReady, appDataDirectory } = commonSlice

  // useEffect(() => {
  //   const id = uuid()
  //   commonSlice.addNotification({
  //     type: "success",
  //     content: "Resource created successfully",
  //     statusIconAriaLabel: "success",
  //     dismissLabel: "Dismiss message",
  //     dismissible: true,
  //     id,
  //     onDismiss: () => {
  //       commonSlice.removeNotification(id)
  //       revalidator.revalidate()
  //     }
  //   })
  // }, [])

  useEffect(() => {
    // Go from last to first crumb, set activeHref to the first one that matches items
    for (const crumb of crumbs.reverse()) {
      if (crumb.path == null) continue
      if (items.find(item => item.href === crumb.path)) {
        setActiveHref(crumb.path)
        break
      }
    }
  }, [crumbs])

  useEffect(() => {
    if (socket.connected) {
      console.log("connected")
      commonSlice.engineReady = true
    } else {
      console.log("disconnected")
      commonSlice.engineReady = false
    }

    socket.on("connect", () => {
      console.log("connected")
      commonSlice.engineReady = true
    })

    revalidator.revalidate()

    return () => {
      socket.off("connect")
    }
  }, [])

  if (!engineReady) {
    return (
      <h1>Insert Splash Screen Here</h1>
    )
  } else if (!appDataDirectory && location.pathname !== "/settings") {
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
      <AppLayout
        navigation={
          <SideNavigation
            header={{
              text: "索引製造機",
              href: "/projects/all",
            }}
            onFollow={e => {
              e.preventDefault()
              navigate(e.detail.href)
            }}
            activeHref={activeHref}
            items={items}
          />
        }
        navigationHide={!commonSlice.appDataDirectory}
        navigationOpen={navigationOpen}
        onNavigationChange={(e) => {
          setNavigationOpen(e.detail.open)
          commonSlice.navigationOpen = e.detail.open
        }}
        content={<Outlet/>}
        breadcrumbs={<BreadCrumbs/>}
        notifications={
          <Flashbar items={commonSlice.notifications}/>
        }
        toolsHide
      />
    )
  }
}
