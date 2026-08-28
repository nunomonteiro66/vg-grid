import { ComponentProps } from "react";

type BlanksTextProps = ComponentProps<"div"> & {
  text: string;
};

export default function BlanksText({ text, ...props }: BlanksTextProps) {
  const specialChar = /^[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]$/;
  return (
    <div {...props}>
      {text.split("").map((char, i) => (
        <span className="text-base" key={i}>
          {char === " "
            ? "\u00A0 \u00A0"
            : specialChar.test(char)
              ? char
              : "__ "}
        </span>
      ))}
    </div>
  );
}
