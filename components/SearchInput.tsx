import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { IconProps, TextField } from "@radix-ui/themes";
import {
  ComponentProps,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  useState,
} from "react";

type SearchInputProps = ComponentProps<typeof TextField.Root> & {
  icon?: ReactNode;
  placeholder?: string;
  onValueChange: (text: string) => void;
  currentSearch: string;
};

export default function SearchInput({
  icon = <MagnifyingGlassIcon height="16" width="16" />,
  placeholder = "Search...",
  onValueChange,
  currentSearch,
  ...props
}: SearchInputProps) {
  return (
    <TextField.Root
      placeholder={placeholder}
      onChange={(event) => {
        const value = event.target.value;
        onValueChange(value);
      }}
      value={currentSearch}
      {...props}
    >
      <TextField.Slot>
        <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      </TextField.Slot>
    </TextField.Root>
  );
}
