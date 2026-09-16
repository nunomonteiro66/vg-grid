import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Button,
  Flex,
  Text,
  TextField,
  Dialog,
  IconButton,
} from "@radix-ui/themes";
import SearchInput from "./ui/SearchInput";
import { ComponentProps, ReactNode, useState } from "react";
import Dropdown from "./ui/Dropdown";
import { DropdownItem } from "./ui/types";
import { Game } from "@/lib/igdb/helpers/types";

type DialogSearchProps = ComponentProps<"div"> & {
  onValueChange: (text: string) => void;
  currentItems: DropdownItem[];
  onItemSelect: (game: DropdownItem) => void;
  icon?: ReactNode;
  placeholder?: string;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function DialogSearch({
  onValueChange,
  currentItems,
  onItemSelect,
  icon = <MagnifyingGlassIcon height="16" width="16" />,
  placeholder = "Search...",
  children,
}: DialogSearchProps) {
  const [currentValue, setCurrentValue] = useState("");

  const localOnValueChange = (text: string) => {
    setCurrentValue(text);
    onValueChange(text);
  };

  const onClose = () => {
    setCurrentValue("");
    onValueChange("");
    //setOpen(false);
  };

  return (
    <Dialog.Root onOpenChange={onClose}>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content maxWidth="450px" minHeight="500px">
        <Dialog.Title>
          <Dialog.Close>
            <div className="w-full flex justify-end">
              <IconButton variant="ghost" radius="full" highContrast>
                <Cross2Icon />
              </IconButton>
            </div>
          </Dialog.Close>
        </Dialog.Title>
        <Flex direction="column" gap="3">
          <SearchInput
            onValueChange={localOnValueChange}
            currentSearch={currentValue}
          />

          <div className="flex flex-col gap-3">
            {currentItems.map((item) => (
              <Button
                onClick={() => onItemSelect(item)}
                key={item.id}
                variant="ghost"
              >
                <div className="flex gap-4 items-center justify-start w-full">
                  <img src={item.icon} width={30}></img>
                  <p className="text-white">{item.name}</p>
                </div>
              </Button>
            ))}
          </div>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
