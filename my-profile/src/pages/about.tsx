import Layout from "../components/layout";
import React from "react";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";
import MDXContent from "../contents/about.mdx";

export const data = graphql`
  query {
    mdx(frontmatter: { slug: { eq: "/about" } }) {
      frontmatter {
        date
        slug
        title
      }
    }
  }
`;

const About: React.FC<PageProps> = (props: any) => {
  const { data } = props;
  const pageData = data.mdx.frontmatter;

  return (
    <Layout pageTitle={pageData.title}>
      <MDXContent />
    </Layout>
  );
};

export default About;
