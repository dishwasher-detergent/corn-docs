import fs from "fs"
import path from "path"
import React from "react"
import { Metadata } from "next"
import Link from "next/link"
import { Node } from "@/interfaces/node.interface"
import Markdoc from "@markdoc/markdoc"
import { globby } from "globby"
import { ChevronRight } from "lucide-react"
import { z } from "zod"
import { parse } from "zod-matter"

import { components, config } from "@/config/markdoc.config"
import { cn, collectHeadings } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TableOfContents } from "@/components/markdoc/table.of.contents"

const CONTENT_DIR = path.join(process.cwd(), "content")

interface Params {
  slug: string
}

interface PageProps {
  params: Params
}

// Based on https://github.com/jonschlinkert/gray-matter/issues/135#issuecomment-1372552007
const frontmatterDefinition = z.object({
  title: z.string(),
  toc: z.boolean().optional().default(true),
})
export async function generateStaticParams() {
  const contentPaths = await globby(path.join(CONTENT_DIR), {
    expandDirectories: { extensions: ["md"] },
  })
  return contentPaths.map((contentPath) => {
    return { slug: path.basename(contentPath, path.extname(contentPath)) }
  })
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { title } = await getMarkdownContent(params.slug)
  return { title: title }
}

async function getMarkdownContent(slug: string | undefined) {
  const filePath = path.join(CONTENT_DIR, slug + ".md")
  const source = fs.readFileSync(filePath, "utf-8")
  const { data: frontmatter } = parse(source, frontmatterDefinition)
  const ast = Markdoc.parse(source)
  const content = Markdoc.transform(ast, config)
  return { content, ...frontmatter }
}

export default async function ContentPage({ params }: PageProps) {
  const { title, toc, content } = await getMarkdownContent(params.slug)
  const tableOfContents = toc ? collectHeadings([content] as Node[]) : []

  return (
    <main className="container relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <Link href="/">Overview</Link>
          </div>
          <ChevronRight className="h-4 w-4" />
          <div className="font-medium text-foreground">{title}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {title}
          </h1>
        </div>
        <div className="pb-12 pt-8 prose">
          {Markdoc.renderers.react(content, React, { components })}
        </div>
      </div>
      {toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden border-l pt-6 ">
            <ScrollArea className="pb-10 pl-10">
              <TableOfContents toc={tableOfContents} />
            </ScrollArea>
          </div>
        </div>
      )}
    </main>
  )
}
