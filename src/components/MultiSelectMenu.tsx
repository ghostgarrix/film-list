import React from "react";
import { FormControl } from "@chakra-ui/react";
import { GroupBase, MultiValue, Select } from "chakra-react-select";
import { useAppDispatch } from "../app/hooks";
import { filtersActions } from "../features/Filters";
import { DEFAULT_COLOR } from "../utils/theme";

interface MultiSelectMenuProps {
  label: string;
  options: string[];
}
interface CategoryOption {
  label: string;
  value: string;
}

const MultiSelectMenu = ({
  label,
  options,
}: MultiSelectMenuProps): React.ReactElement | null => {
  const dispatch = useAppDispatch();
  const onChangeOption = (
    selectedOptions: MultiValue<CategoryOption>
  ): void => {
    dispatch(
      filtersActions.setSelectedCategories(
        selectedOptions.reduce<string[]>((acc, curr) => {
          acc.push(curr.label);
          return acc;
        }, [])
      )
    );
  };

  const groupedOptions = [
    {
      label,
      options: options.reduce<CategoryOption[]>((acc, curr) => {
        acc.push({ label: curr, value: curr });
        return acc;
      }, []),
    },
  ];

  return (
    <FormControl p={4}>
      <Select<CategoryOption, true, GroupBase<CategoryOption>>
        isMulti
        options={groupedOptions}
        placeholder={"Select categories"}
        closeMenuOnSelect={false}
        selectedOptionStyle={"check"}
        hideSelectedOptions={false}
        onChange={onChangeOption}
        colorScheme={DEFAULT_COLOR}
      />
    </FormControl>
  );
};

export default MultiSelectMenu;
