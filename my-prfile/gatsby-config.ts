import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `My Profile`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-mdx", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  },
  {
    resolve: '@chakra-ui/gatsby-plugin',
    options: {
      /**
       * @property {boolean} [resetCSS=true]
       * if false, this plugin will not use `<CSSReset />
       */
      resetCSS: true,
      /**
       * @property {number} [portalZIndex=undefined]
       * The z-index to apply to all portal nodes. This is useful
       * if your app uses a lot z-index to position elements.
       */
      portalZIndex: undefined,
    },
  },
  "gatsby-plugin-image",
  "gatsby-plugin-sharp"
  ]
};

export default config;
