import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import { MDXRemote, compileMDX } from "next-mdx-remote/rsc";
import fs from "fs";
import path from "path";
import { cn } from "@/lib/utils";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

//Single blog post raw content
async function getBlogPostFromParams({ params }: DocPageProps) {
  const slug = params.slug?.join("/") || "";
  const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const mdxContent = fs.readFileSync(filePath, "utf8");

  return { source: mdxContent, slug };
}

//Static params for all blog posts
export async function generateStaticParams() {
  const contentDirectory = path.resolve(process.cwd(), "content");
  const files = fs.readdirSync(path.resolve(process.cwd(), contentDirectory));

  const slugs = files.map((file) => ({
    slug: file.replace(/\.mdx$/, "").split("/"),
  }));

  return slugs;
}

export default async function BlogPostPage({ params }: DocPageProps) {
  const doc = await getBlogPostFromParams({ params });

  if (!doc) {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<{
    title: string;
    description: string;
  }>({
    source: doc.source,
    options: { parseFrontmatter: true },
  });

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            Docs
          </div>
          {/* <ChevronRightIcon className="h-4 w-4" /> */}
          <div className="font-medium text-foreground">{frontmatter.title}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {frontmatter.title}
          </h1>
          {frontmatter.description && (
            <p className="text-lg text-muted-foreground">
              {frontmatter.description}
            </p>
          )}
        </div>
        {/* {doc.links ? (
          <div className="flex items-center space-x-2 pt-4">
            {doc.links?.doc && (
              <Link
                href={doc.links.doc}
                target="_blank"
                rel="noreferrer"
                className={cn("gap-1")}
              >
                Docs
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            )}
            {doc.links?.api && (
              <Link
                href={doc.links.api}
                target="_blank"
                rel="noreferrer"
                className={cn("gap-1")}
              >
                API Reference
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            )}
          </div>
        ) : null} */}
        <div className="pb-12 pt-8">{content}</div>
      </div>
      {/* {doc.toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
              <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
              </div>
          </div>
        </div>
      )} */}
    </main>
  );
}
