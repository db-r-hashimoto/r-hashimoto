import {
  HStack,
  TableCellProps,
  TableRowProps,
  Text,
  Tr as ChakraTr,
  Td as ChakraTd,
} from "@chakra-ui/react";
import React, { FC } from "react";

export const Tr: FC<TableRowProps> = (props) => {
  return <ChakraTr border="none" {...props} />;
};
export const Td: FC<TableCellProps> = (props) => {
  return <ChakraTd border="none" {...props} />;
};

const CustomTable = (props: any) => {
  const year = props.year;
  const contents = props.contents;

  return (
    <HStack spacing="2">
      <Text>{year}年</Text>
      <Text>{contents}</Text>
    </HStack>
  );
};

export default CustomTable;
