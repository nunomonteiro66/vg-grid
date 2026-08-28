import { ComponentProps, useRef, useState } from "react";
import Dropdown, { DropdownItem } from "../Dropdown";
import SearchInput from "../SearchInput";

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
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div {...props}>
      <Dropdown
        items={items}
        onOptionSelect={(item) => {
          //setOpen(false);
          //setSearch("");
          onOptionSelect(item);
        }}
        open={open}
        setOpen={setOpen}
      >
        <SearchInput
          placeholder="Search for a game..."
          onValueChange={(value) => {
            setSearch(value);
            onValueChange(value);
          }}
          currentSearch={search}
          onInput={() => setOpen(true)}
        />
      </Dropdown>
    </div>
  );
}
