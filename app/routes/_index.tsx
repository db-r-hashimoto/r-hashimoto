import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllPosts } from "~/utils/blog.server";
import Layout from "~/components/Layout";
import type { Post } from "~/types";

type LoaderData = {
  posts: Post[];
  recentPosts: Post[];
};

export const loader: LoaderFunction = async () => {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 5);
  return json<LoaderData>({ posts, recentPosts });
};

export default function Index() {
  const { posts, recentPosts } = useLoaderData<LoaderData>();

  return (
    <Layout recentPosts={recentPosts}>
      <h1 className="text-4xl font-bold mb-8">
        r-hashimoto Tech Blogへようこそ
      </h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="bg-white shadow rounded-lg p-6">
            <a
              href={`/posts/${post.slug}`}
              className="text-xl font-semibold text-blue-600 hover:underline"
            >
              {post.frontmatter.title}
            </a>
            <p className="mt-2 text-gray-600">{post.frontmatter.description}</p>
            <p className="mt-2 text-sm text-gray-500">
              投稿日: {post.frontmatter.date}
            </p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
