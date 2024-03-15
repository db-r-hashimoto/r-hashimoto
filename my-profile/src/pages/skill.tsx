import Layout from "../components/layout";
import React from "react";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";
import MDXContent from "../contents/skill.mdx";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const data = graphql`
  query {
    mdx(frontmatter: { slug: { eq: "/skill" } }) {
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

  const skillLevel = [
    "未経験",
    "個人開発、研修",
    "駆け出し",
    "中堅",
    "プロジェクトリーダ",
    "テックリード",
  ];

  const skillData = [
    {
      subject: "プロジェクトマネジメント",
      score: 4,
    },
    {
      subject: "デザイン",
      score: 1,
    },
    {
      subject: "フロントエンド",
      score: 4,
    },
    {
      subject: "バックエンド",
      score: 1,
    },
    {
      subject: "インフラ",
      score: 1,
    },
    {
      subject: "その他",
      score: 3,
    },
  ];

  return (
    <Layout pageTitle={pageData.title}>
      <RadarChart cx="50%" cy="50%" outerRadius="65%" data={skillData}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey="subject"
          tick={{
            fill: "#0b1013",
          }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 5]}
          tickCount={6}
          tickFormatter={(value, index) => `${value}: ${skillLevel[index]}`}
          tick={{
            fill: "#0b101360",
            fontSize: 12,
          }}
        />
        <Radar
          dataKey="score"
          stroke="#125E8A"
          fill="#125E8A"
          fillOpacity={0.6}
        />
        <Tooltip />
      </RadarChart>
      <MDXContent />
    </Layout>
  );
};

export default Skill;
