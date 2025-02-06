import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

interface Profile {
  title: string;
  module: () => JSX.Element;
}

interface ModuleType {
  default: {
    (): JSX.Element;
    displayName?: string;
  };
  frontmatter: {
    meta: Array<{ title: string }>;
  };
}

export async function clientLoader({
  params,
}: LoaderFunctionArgs): Promise<Profile> {
  const modules = import.meta.glob<ModuleType>("/data/**/*{.md,.mdx}", {
    eager: true,
  });
  let post = null;
  Object.entries(modules).forEach(([filePath, module]) => {
    const slug = filePath
      .replace(/^.*[\\/]/, "")
      .replace(".mdx", "")
      .replace(".md", "");
    if (!params.slug) return;
    const normalizedSlug = params.slug.replace("/posts", "");
    if (normalizedSlug === slug) {
      post = {
        title: module.frontmatter.meta[0].title,
        module: () => module.default(),
      };
    }
  });
  // 記事がなかった場合、404を返す
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return post;
}

export default function Post() {
  const post = useLoaderData<Profile>();

  if (!post || !post.module) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 overflow-visible">
        <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
        <div className="prose dark:prose-invert max-w-2000 pb-12">
          {post.module()}
        </div>
      </div>
    </div>
  );
}
