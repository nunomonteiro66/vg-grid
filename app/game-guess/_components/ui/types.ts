export type DropdownItemvariant = "default" | "warning" | "danger";

export type DropdownItem = {
  icon?: string;
  name: string;
  id: number;
  disabled?: boolean;
  variant?: DropdownItemvariant;
};
