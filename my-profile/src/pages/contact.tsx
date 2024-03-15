import Layout from "../components/layout";
import React from "react";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";
import MDXContent from "../contents/contact.mdx";

export const data = graphql`
  query {
    mdx(frontmatter: { slug: { eq: "/contact" } }) {
      frontmatter {
        date
        slug
        title
      }
    }
  }
`;

const Skill: React.FC<PageProps> = (props: any) => {
  const { data } = props;
  const pageData = data.mdx.frontmatter;

  return (
    <Layout pageTitle={pageData.title}>
      <MDXContent />
    </Layout>
  );
};

export default Skill;
