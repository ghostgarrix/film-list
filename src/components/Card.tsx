import React from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  Stack,
  Progress,
} from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DEFAULT_COLOR, RED } from "../utils/theme";

interface CardProps {
  id: string;
  subtitle: string;
  title: string;
  leftButtonText?: string;
  rightButtonText?: string;
  activeLeftIcon: boolean;
  barValue: number;
  onPressLeftButton(id: string): void;
  onPressRightButton(id: string): void;
}

export const Card = ({
  id,
  subtitle,
  title,
  leftButtonText = "Like",
  rightButtonText = "Delete",
  activeLeftIcon,
  barValue,
  onPressLeftButton,
  onPressRightButton,
}: CardProps): React.ReactElement | null => {
  return (
    <Center>
      <Box m={5} p={6} bg={"white"} boxShadow={"2xl"} rounded={"lg"}>
        <Stack align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {subtitle}
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={700}>
            {title}
          </Heading>
        </Stack>

        <Progress
          value={barValue}
          m={5}
          size="xs"
          colorScheme={DEFAULT_COLOR}
          bg={RED}
          rounded={"lg"}
        />

        <Stack mt={8} direction={"row"} justifyContent={"space-evenly"}>
          <Button
            leftIcon={activeLeftIcon ? <BsHeartFill /> : <BsHeart />}
            colorScheme={DEFAULT_COLOR}
            variant={"solid"}
            onClick={() => onPressLeftButton(id)}
          >
            {leftButtonText}
          </Button>
          <Button
            leftIcon={<RiDeleteBin6Line size={20} />}
            colorScheme={RED}
            variant={"solid"}
            onClick={() => onPressRightButton(id)}
          >
            {rightButtonText}
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default Card;
