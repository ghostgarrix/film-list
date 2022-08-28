import React, { useState } from "react";
import { Button, Center, Text } from "@chakra-ui/react";
import { useAppDispatch } from "../app/hooks";
import { filtersActions, OFFSET } from "../features/Filters";

const OffsetSelector = (): React.ReactElement | null => {
  const dispatch = useAppDispatch();
  const [selectedOffset, setSelectedOffset] = useState<number>(OFFSET[0]);

  const onChangeOffset = (number: number): void => {
    setSelectedOffset(number);
    dispatch(filtersActions.setOffset(number));
  };

  return (
    <Center>
      <Text color={"gray.500"} fontSize={"sm"}>
        {"Elements displayed"}
      </Text>
      {OFFSET.map((offset) => (
        <Button
          key={offset}
          colorScheme="teal"
          variant={offset === selectedOffset ? "solid" : "outline"}
          m={1}
          boxShadow={"2xl"}
          onClick={() => onChangeOffset(offset)}
        >
          {offset}
        </Button>
      ))}
    </Center>
  );
};

export default OffsetSelector;
