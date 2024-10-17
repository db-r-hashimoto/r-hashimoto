import { Link } from "@remix-run/react";
import type { Post } from "~/types";

interface SidebarProps {
  recentPosts: Post[];
}

export default function Sidebar({ recentPosts }: SidebarProps) {
  return (
    <aside className="ml-8">
      <h2 className="text-2xl font-bold mb-4">最近の投稿</h2>
      <ul className="space-y-2">
        {recentPosts.map((post) => (
          <li key={post.slug}>
            <Link
              to={`/posts/${post.slug}`}
              className="text-blue-600 hover:underline"
            >
              {post.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
