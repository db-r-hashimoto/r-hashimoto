import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Box, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import DrawerMenu from "./menu";
import { MDXProvider } from "@mdx-js/react";

const Layout = (props: any) => {
  const pageTitle = props.pageTitle;
  const children = props.children;
  const bg = props.bg || null;

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
      paddingTop="24px"
      paddingLeft="12px"
      fontFamily="heading"
    >
      <header>
        <HStack spacing="12px">
          <DrawerMenu />
          <HStack spacing="12px" fontSize="xl">
            <Text textColor="blue.800" fontWeight="bold">
              {data.site.siteMetadata.title}
            </Text>
            <Text textColor="gray.900">|</Text>
            <Text textColor="gray.900">{pageTitle || "Home"}</Text>
          </HStack>
        </HStack>
      </header>
      <main>
        <Box paddingTop="12px" paddingLeft="60px">
          {children}
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
          <VStack>
            <Text color="gray.600" as="kbd" fontSize="sm" paddingTop="24px">
              © {thisYear} db-r-hashimoto. All rights reserved.
            </Text>
            {/* <Box>
              icon by{" "}
              <Link
                target="_blank"
                href="https://icons8.com/icon/21735/liverpool-fc"
                textColor={"blue.400"}
                textDecoration="underline"
              >
                リバプールFC
              </Link>{" "}
              アイコン by{" "}
              <Link
                target="_blank"
                href="https://icons8.com"
                textColor={"blue.400"}
                textDecoration="underline"
              >
                Icons8
              </Link>
            </Box> */}
          </VStack>
        </Box>
      </footer>
    </Box>
  );
};

export default Layout;
