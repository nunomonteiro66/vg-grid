import { Popover } from "@radix-ui/themes";
import { ComponentProps, Dispatch, SetStateAction } from "react";
import SearchInput from "./SearchInput";

export type DropdownItem = {
  img: string;
  name: string;
  id: number;
};

type ButtonProps = ComponentProps<"button">;

type DropdownProps = {
  items: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="flex items-center gap-8 hover:bg-gray-600" {...props}>
      {children}
    </button>
  );
}

export default function Dropdown({
  items,
  onSelect,
  open,
  setOpen,
}: DropdownProps) {
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <div></div>
      </Popover.Trigger>

      <Popover.Content
        onOpenAutoFocus={(event) => {
          event.preventDefault();
        }}
        side="bottom"
        sideOffset={0}
        avoidCollisions={false}
      >
        <div className="max-h-[calc(var(--radix-popover-content-available-height)-50px)] overflow-y-auto gap-2 flex flex-col">
          {items.map((item) => (
            <Button onClick={() => onSelect(item)} key={item.id}>
              <img src={item.img} width={30}></img>
              <p>{item.name}</p>
            </Button>
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
