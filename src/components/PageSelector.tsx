import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { filtersActions } from "../features/Filters";

interface PageSelectorProps {
  numberOfPages: number;
  currentPage: number;
}

const PageSelector = ({
  currentPage,
  numberOfPages,
}: PageSelectorProps): React.ReactElement | null => {
  const dispatch = useAppDispatch();
  const pages = Array.from(Array(numberOfPages + 2).keys());
  const [selectedPage, setSelectedPage] = useState<number>(currentPage);
  useEffect(() => {
    setSelectedPage(currentPage);
  }, [currentPage]);

  const onChangePage = (page: number): void => {
    if (page && page + 1 <= pages.length) {
      setSelectedPage(page);
      dispatch(filtersActions.setCurrentPage(page));
    }
  };

  return (
    <Box m={5} p={6} bg={"white"} boxShadow={"2xl"} rounded={"lg"}>
      {pages.map((page) => (
        <Button
          key={page}
          disabled={
            (page === 0 && currentPage === 1) ||
            (page + 1 === pages.length && currentPage + 2 === pages.length)
          }
          colorScheme="teal"
          variant={page === selectedPage ? "solid" : "outline"}
          m={1}
          boxShadow={"2xl"}
          onClick={() =>
            onChangePage(
              page === 0
                ? currentPage - 1
                : page + 1 === pages.length
                ? currentPage + 1
                : page
            )
          }
        >
          {page === 0 ? "<" : page + 1 === pages.length ? ">" : page}
        </Button>
      ))}
    </Box>
  );
};

export default PageSelector;
