import React from "react"
import dynamic from "next/dynamic"

const AppComponent = dynamic(
  () => import("../components/app").then((e) => e.App),
  { ssr: false }
)
export default function IndexPage() {
  return <AppComponent />
}
