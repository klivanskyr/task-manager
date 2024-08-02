import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Tasks } from "@/components/Tasks"

export default function IndexPage() {
  return (
    <main>
      <Tasks />
    </main>
  )
}
