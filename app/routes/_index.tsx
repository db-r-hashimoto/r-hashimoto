import { Link, useLoaderData } from "@remix-run/react";

// 定義済みのモジュール型
interface ModuleType {
  frontmatter: {
    meta: Array<{ title: string }>;
  };
}

// SPAモードは Loader() は使用できないため、clientLoader() を使用
export async function clientLoader() {
  // public ディレクトリはルートとして提供されるため、"/data/..." と指定
  const modules = import.meta.glob<ModuleType>("/data/**/*{.md,.mdx}", {
    eager: true,
  });

  const posts = Object.entries(modules).map(
    ([filePath, module]: [string, ModuleType]) => {
      return {
        slug: filePath
          .replace(/^.*[\\/]/, "")
          .replace(".mdx", "")
          .replace(".md", ""),
        title: module.frontmatter.meta[0].title,
      };
    }
  );
  return posts;
}

export default function Profile() {
  // Awaited を使用して Promise を解決した型に変更
  const posts = useLoaderData<Awaited<ReturnType<typeof clientLoader>>>();

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 overflow-visible">
          <p className="text-2xl font-bold mb-6">Posts</p>
          <ul className="list-disc pl-4">
            {posts.map((post, index) => (
              <li key={index} className="mb-2">
                <Link to={`/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
