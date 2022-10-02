import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../markdown/code-block";
import { H2, H3 } from "../markdown/heading";
import Breadcrumb from "../breadcrumb/breadcrumb";
import { useRouter } from "next/router";
import Loading from "../loading";
import Footer from "../layout/footer";

const DynamicDocument = (c: any) =>
  dynamic(() => import(`../../_posts/${c}.mdx`), {
    ssr: false,
    loading: Loading,
  });

interface DocProps {
  data: {
    path: string;
    headings: string[];
    slug: string;
    data: {
      description: string;
      title: string;
      banner: string;
    };
  };
}

const components = {
  h2: H2,
  h3: H3,
  pre: CodeBlock,
};

const DisplayDoc = ({ data }: DocProps) => {
  const DocumentContent = DynamicDocument(data.path);
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={`${data.data.title} | ${process.env.NEXT_PUBLIC_PROJECT_NAME}`}
        canonical={`${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}/${data.slug}`}
        description={data.data.description}
        openGraph={{
          title: `${data.data.title} | ${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
          url: `${process.env.NEXT_PUBLIC_PRODUCTION_ROOT_URL}/Docs/${data.path}`,
          description: data.data.description,
          type: "article",
          images: [
            {
              url: data.data.banner,
              width: 800,
              height: 600,
              alt: data.data.title,
              type: "image/jpeg",
            },
            {
              url: data.data.banner,
              width: 900,
              height: 800,
              alt: data.data.title,
              type: "image/jpeg",
            },
          ],
          site_name: `${process.env.NEXT_PUBLIC_PROJECT_NAME}'s Documentation`,
        }}
      />
      <div className="relative flex h-full w-full flex-row justify-start overflow-hidden overflow-y-auto">
        <article className="prose prose-slate h-full w-full max-w-none flex-1 p-6 dark:prose-invert md:p-10">
          <Breadcrumb data={router.query.slug} />
          {/* @ts-ignore */}
          <MDXProvider components={components}>
            <DocumentContent />
          </MDXProvider>
          <Footer>
            {process.env.NEXT_PUBLIC_GITHUB_URL && (
              <a
                target="_blank"
                href={`${process.env.NEXT_PUBLIC_GITHUB_URL}/edit/master/_posts/${data.path}.mdx`}
              >
                Edit on GitHub
              </a>
            )}
          </Footer>
        </article>
        <nav className="sticky top-0 hidden h-full w-72 flex-none flex-col gap-1 overflow-y-auto p-10 md:flex">
          <p className="w-full rounded-md bg-primary-300/20 px-2 py-1.5 font-bold text-primary-500">
            On this page
          </p>
          {data.headings.map((item: any) => {
            return (
              <a
                href={`#${item.text
                  ?.toString()
                  .trim()
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                className={`jusify-between flex w-full flex-none flex-row items-center gap-2 font-semibold hover:text-primary-500 ${
                  item.level == 2 ? "text-md pt-2" : "pl-2 text-sm"
                }`}
              >
                {item.level == 3 && (
                  <svg
                    className="h-3 w-3 flex-none rotate-90 text-primary-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    fill="currentColor"
                  >
                    {/* <!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                    <path d="M342.6 182.6C336.4 188.9 328.2 192 319.1 192s-16.38-3.125-22.62-9.375L224 109.3V432c0 44.13-35.89 80-80 80H32c-17.67 0-32-14.31-32-32s14.33-32 32-32h112C152.8 448 160 440.8 160 432V109.3L86.62 182.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l127.1-128c12.5-12.5 32.75-12.5 45.25 0l128 128C355.1 149.9 355.1 170.1 342.6 182.6z" />
                  </svg>
                )}
                <span className="w-full truncate">{item.text}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default DisplayDoc;
