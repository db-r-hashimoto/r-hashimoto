// app/components/MDXRenderer.tsx
import React, { useEffect, useState } from "react";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

interface MDXRendererProps {
  fileUrl: string;
  components?: Record<string, React.ComponentType<any>>;
}

// evaluate により得られる評価結果の default エクスポートは React コンポーネントです
type MDXComponentType = React.ComponentType<{
  components?: Record<string, React.ComponentType<any>>;
}>;

const MDXRenderer: React.FC<MDXRendererProps> = ({
  fileUrl,
  components = {},
}) => {
  const [Content, setContent] = useState<MDXComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAndEvaluate = async () => {
      try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch MDX file: ${response.statusText}`);
        }
        const mdxSource = await response.text();

        // evaluate 関数に渡すオプションについて、型エラーを避けるため any としてキャスト
        const options = {
          jsxRuntime: runtime,
          Fragment: runtime.Fragment,
          remarkPlugins: [
            remarkFrontmatter as any,
            remarkMdxFrontmatter as any,
          ],
        } as any;

        const evaluated = await evaluate(mdxSource, options);
        setContent(() => evaluated.default as MDXComponentType);
      } catch (err) {
        console.error("Error evaluating MDX:", err);
        setError(String(err));
      }
    };

    loadAndEvaluate();
  }, [fileUrl]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Content) {
    return <div>Loading MDX...</div>;
  }

  return <Content components={components} />;
};

export default MDXRenderer;
