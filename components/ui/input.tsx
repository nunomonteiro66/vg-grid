import { TextField } from "@radix-ui/themes";
import { ComponentProps } from "react";

type InputProps = ComponentProps<typeof TextField.Root> & {
  placeholder: string;
  name: string;
  label: string;
  required?: boolean;
};

export default function Input({
  placeholder,
  name,
  label,
  required = true,
  ...props
}: InputProps) {
  return (
    <span className="flex flex-col w-full gap-2">
      <label className="text-[12px] text-neutral-500">{label}</label>
      <TextField.Root
        placeholder={placeholder}
        name={name}
        required={required}
        className="w-full"
        {...props}
      ></TextField.Root>
    </span>
  );
}
