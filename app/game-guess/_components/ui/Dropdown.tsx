import { Popover } from "@radix-ui/themes";
import { ComponentProps, Dispatch, ReactNode, SetStateAction } from "react";
import SearchInput from "./SearchInput";
import { DropdownItem, DropdownItemvariant } from "./types";

const variantClasses: Record<DropdownItemvariant, string> = {
  default: "",
  warning: "bg-amber-300",
  danger: "bg-red-500",
};

type ButtonProps = ComponentProps<"button">;

type DropdownProps = ComponentProps<"div"> & {
  items: DropdownItem[];
  onOptionSelect: (item: DropdownItem) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="flex items-center gap-8 hover:bg-gray-600" {...props}>
      {children}
    </button>
  );
}

function DropdownItemComponent({ item }: { item: DropdownItem }) {
  return (
    <div
      className={`flex items-center gap-8 w-full ${
        item.variant ? variantClasses[item.variant] : ""
      }`}
    >
      <>
        <img src={item.icon} width={30}></img>
        <p>{item.name}</p>
      </>
    </div>
  );
}

export default function Dropdown({
  items,
  onOptionSelect,
  children,
  open,
  setOpen,
  ...props
}: DropdownProps) {
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <div>{children}</div>
      </Popover.Trigger>

      <Popover.Content
        onOpenAutoFocus={(event) => {
          event.preventDefault();
        }}
        side="bottom"
        sideOffset={0}
      >
        <div
          className="max-h-[calc(var(--radix-popover-content-available-height)-50px)] overflow-y-auto gap-2 flex flex-col"
          {...props}
        >
          {items.map((item) => (
            <Button
              onClick={() => onOptionSelect(item)}
              key={item.id}
              disabled={item.disabled}
            >
              <DropdownItemComponent item={item} />
            </Button>
          ))}

          {items.length === 0 && (
            <DropdownItemComponent item={{ name: "No results", id: 0 }} />
          )}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
