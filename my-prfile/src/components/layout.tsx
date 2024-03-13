import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Box, Heading, HStack, Text, Spacer } from "@chakra-ui/react";
import DrawerMenu from "../components/menu";

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
      bgColor="gray.900"
      alignContent="center"
      height="2000px"
      paddingTop="24px"
      paddingLeft="12px"
    >
      <header>
        <HStack spacing="12px">
          <DrawerMenu />
          <Heading textColor="yellow.500" fontWeight="bold">
            {data.site.siteMetadata.title}
          </Heading>
        </HStack>
      </header>
      <main>
        <Box paddingTop="12px" paddingLeft="60px">
          <HStack alignItems="start" spacing="2">
            <Text textColor="gray.200" fontSize="2xl">{pageTitle || "Home"}</Text>
            {children}
          </HStack>
        </Box>
      </main>
      <footer>
        <Box
          justifyContent="center"
          display="flex"
          marginTop="24px"
          paddingRight="48px"
          borderTop="solid"
          borderColor="gray.200"
          width="full"
        >
          <Text color="gray.100" as="kbd" size="sm" paddingTop="24px">
            © {thisYear} db-r-hashimoto. All rights reserved.
          </Text>
        </Box>
      </footer>
    </Box>
  );
};

export default Layout;
