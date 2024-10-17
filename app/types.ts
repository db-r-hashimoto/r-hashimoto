export interface Post {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
  };
  content: string;
}
