import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Box, Heading, HStack, Text, Spacer } from "@chakra-ui/react";
import DrawerMenu from "./menu";
import { MDXProvider } from "@mdx-js/react";

const Layout = (props: any) => {
  const pageTitle = props.pageTitle;
  const children = props.children;

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const thisYear = new Date().getFullYear();

  return (
    <Box
      alignContent="center"
      height="2000px"
      paddingTop="24px"
      paddingLeft="12px"
    >
      <header>
        <HStack spacing="12px">
          <DrawerMenu />
          <Heading textColor="blue.800" fontWeight="bold">
            {data.site.siteMetadata.title}
          </Heading>
        </HStack>
      </header>
      <main>
        <Box paddingTop="12px" paddingLeft="60px">
          <Text textColor="gray.900" fontSize="2xl">
            {pageTitle || "Home"}
          </Text>
          <MDXProvider>{children}</MDXProvider>
        </Box>
      </main>
      <footer>
        <Box
          alignContent="center"
          justifyContent="center"
          display="flex"
          marginTop="24px"
          paddingRight="48px"
          borderTop="solid"
          borderColor="gray.500"
          width="99%"
        >
          <Text color="gray.600" as="kbd" size="xs" paddingTop="24px">
            © {thisYear} db-r-hashimoto. All rights reserved.
          </Text>
        </Box>
      </footer>
    </Box>
  );
};

export default Layout;
