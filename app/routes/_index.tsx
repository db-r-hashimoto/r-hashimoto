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
      <div className="mb-4">
        <ul className="list-disc pl-24 pt-4">
          {posts.map((post, index) => (
            <li key={index} className="pt-2">
              <Link to={`/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
