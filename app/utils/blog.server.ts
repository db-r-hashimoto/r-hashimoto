import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post } from "~/types";

const postsDirectory = path.join(process.cwd(), "content", "blog");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      frontmatter: {
        title: data.title || "",
        date: data.date || "",
        description: data.description || "",
      },
      content,
    };
  } catch (error) {
    console.error(`Error reading file: ${fullPath}`, error);
    return {
      slug: realSlug,
      frontmatter: {
        title: "",
        date: "",
        description: "",
      },
      content: "",
    };
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) =>
      post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
    );
  return posts;
}
