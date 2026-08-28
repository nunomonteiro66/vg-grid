import { Popover } from "@radix-ui/themes";
import { ComponentProps, Dispatch, ReactNode, SetStateAction } from "react";
import SearchInput from "./SearchInput";

export type DropdownItemvariant = "default" | "warning" | "danger";

const variantClasses: Record<DropdownItemvariant, string> = {
  default: "",
  warning: "bg-amber-300",
  danger: "bg-red-500",
};

export type DropdownItem = {
  icon?: string;
  name: string;
  id: number;
  disabled?: boolean;
  variant?: DropdownItemvariant;
};

type ButtonProps = ComponentProps<"button">;

type DropdownProps = ComponentProps<"div"> & {
  items: DropdownItem[];
  onOptionSelect: (item: DropdownItem) => void;
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
  onOptionSelect,
  open,
  setOpen,
  children,
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
              <div
                className={`flex items-center gap-8 w-full ${
                  item.variant ? variantClasses[item.variant] : ""
                }`}
              >
                <img src={item.icon} width={30}></img>
                <p>{item.name}</p>
              </div>
            </Button>
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
