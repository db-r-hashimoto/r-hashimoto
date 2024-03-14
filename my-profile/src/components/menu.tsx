import {
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  useDisclosure,
  DrawerHeader,
  Button,
  Stack,
  Link,
} from "@chakra-ui/react";
import type { LinkProps } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React from "react";

const HoverLink = (props: LinkProps) => (
  <Link rounded="base" _hover={{ bg: "blue.300" }} p={2} {...props} />
);

const DrawerMenu = () => {
  // useDisclosureで閉じ・開きの管理
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      {/* ハンバーガーアイコン部分 */}
      <Button ref={btnRef} onClick={onOpen} _hover={{ bg: "gray.400" }}>
        <HamburgerIcon color="gray.900" />
      </Button>
      {/* Drawer部分 */}
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
        finalFocusRef={btnRef}
        size="xs"
      >
        <DrawerOverlay>
          <DrawerContent bgColor="blue.100" textColor="gray.800">
            <DrawerCloseButton />
            <DrawerHeader fontSize="xl">Menu</DrawerHeader>
            <DrawerBody fontSize="lg">
              <Stack as="nav">
                <HoverLink href="/">Home</HoverLink>
                <HoverLink href="/about">About</HoverLink>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default DrawerMenu;