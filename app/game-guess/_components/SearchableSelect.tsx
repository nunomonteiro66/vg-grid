import { ComponentProps, useRef, useState } from "react";
import Dropdown from "./ui/Dropdown";
import SearchInput from "./ui/SearchInput";
import { DropdownItem } from "./ui/types";

type SearchableSelectProps = ComponentProps<"div"> & {
  items: DropdownItem[];
  onOptionSelect: (value: DropdownItem) => void;
  onValueChange: (value: string) => void;
};

export default function SearchableSelect({
  items,
  onOptionSelect,
  onValueChange,
  ...props
}: SearchableSelectProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div {...props}>
      <Dropdown
        items={items}
        open={open}
        setOpen={setOpen}
        onOptionSelect={(item) => {
          onOptionSelect(item);
        }}
      >
        <SearchInput
          placeholder="Search for a game..."
          onFocus={() => setOpen(true)}
          onValueChange={(value) => {
            setSearch(value);
            onValueChange(value);
            setOpen(true);
          }}
          currentSearch={search}
        />
      </Dropdown>
    </div>
  );
}
