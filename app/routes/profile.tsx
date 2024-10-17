import Layout from "~/components/Layout";
import { getAllPosts } from "~/utils/blog.server";
import { getCareerInfo } from "~/utils/profile.server";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import type { Post } from "~/types";
import ReactMarkdown from "react-markdown";

export const loader: LoaderFunction = async () => {
  const careerInfo = getCareerInfo();
  const recentPosts = getAllPosts().slice(0, 5);
  return { careerInfo, recentPosts };
};

export default function Profile() {
  const { careerInfo, recentPosts } = useLoaderData<{
    careerInfo: string;
    recentPosts: Post[];
  }>();

  return (
    <Layout recentPosts={recentPosts}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">プロフィール</h2>
        <div className="prose prose-sm lg:prose-base">
          <ReactMarkdown
            components={{
              h1: ({ children, ...props }) => (
                <h2 className="text-2xl font-bold mt-6 mb-4" {...props}>
                  {children}
                </h2>
              ),
              h2: ({ children, ...props }) => (
                <h3 className="text-xl font-semibold mt-4 mb-2" {...props}>
                  {children}
                </h3>
              ),
              h3: ({ children, ...props }) => (
                <h4 className="text-lg font-medium mt-3 mb-2" {...props}>
                  {children}
                </h4>
              ),
              p: ({ children, ...props }) => (
                <p className="mb-3" {...props}>
                  {children}
                </p>
              ),
              ul: ({ children, ...props }) => (
                <ul className="list-disc pl-5 mb-3" {...props}>
                  {children}
                </ul>
              ),
              ol: ({ children, ...props }) => (
                <ol className="list-decimal pl-5 mb-3" {...props}>
                  {children}
                </ol>
              ),
              li: ({ children, ...props }) => (
                <li className="mb-1" {...props}>
                  {children}
                </li>
              ),
            }}
          >
            {careerInfo}
          </ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
}
