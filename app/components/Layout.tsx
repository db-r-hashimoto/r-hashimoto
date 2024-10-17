import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import type { Post } from "~/types";

interface LayoutProps {
  children: ReactNode;
  recentPosts?: Post[];
}

export default function Layout({ children, recentPosts }: LayoutProps) {
  return (
    <div className="flex-grow container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <main className="flex-grow md:w-3/4">{children}</main>
        {recentPosts && (
          <aside className="md:w-1/4">
            <Sidebar recentPosts={recentPosts} />
          </aside>
        )}
      </div>
    </div>
  );
}
