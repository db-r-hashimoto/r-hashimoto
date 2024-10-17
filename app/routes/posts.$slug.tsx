import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getAllPosts } from "~/utils/blog.server";
import Layout from "~/components/Layout";
import type { Post } from "~/types";

type LoaderData = {
  post: Post;
  recentPosts: Post[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.slug;
  if (!slug) throw new Error("Slug is required");

  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();
  return json({ post, recentPosts: allPosts.slice(0, 5) });
};

export default function Post() {
  const { post, recentPosts } = useLoaderData<LoaderData>();

  return (
    <Layout recentPosts={recentPosts}>
      <article className="prose lg:prose-xl">
        <h2 className="text-4xl font-bold mb-4">{post.frontmatter.title}</h2>
        <p className="text-gray-600">{post.frontmatter.date}</p>
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children, ...props }) => (
                <h2 className="text-3xl font-bold mt-6 mb-4" {...props}>
                  {children}
                </h2>
              ),
              h2: ({ children, ...props }) => (
                <h3 className="text-2xl font-semibold mt-5 mb-3" {...props}>
                  {children}
                </h3>
              ),
              h3: ({ children, ...props }) => (
                <h4 className="text-xl font-medium mt-4 mb-2" {...props}>
                  {children}
                </h4>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </Layout>
  );
}
