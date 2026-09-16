import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DialogSearch from "./DialogSearch";
import { DropdownItem } from "./ui/types";

const items: DropdownItem[] = [
  { id: 1, name: "Super Mario 64" },
  { id: 2, name: "Ocarina of Time" },
];

describe("DialogSearch", () => {
  it("opens the dialog and lists the given items", async () => {
    const user = userEvent.setup({ delay: null });

    render(
      <DialogSearch
        currentItems={items}
        onValueChange={() => {}}
        onItemSelect={() => {}}
        open
        setOpen={() => {}}
      >
        <button>open search</button>
      </DialogSearch>,
    );

    await user.click(screen.getByText("open search"));

    expect(screen.getByText("Super Mario 64")).toBeInTheDocument();
    expect(screen.getByText("Ocarina of Time")).toBeInTheDocument();
  });

  it("calls onValueChange as the user types", async () => {
    const user = userEvent.setup({ delay: null });
    const onValueChange = jest.fn();

    render(
      <DialogSearch
        currentItems={items}
        onValueChange={onValueChange}
        onItemSelect={() => {}}
        open
        setOpen={() => {}}
      >
        <button>open search</button>
      </DialogSearch>,
    );

    await user.click(screen.getByText("open search"));
    await user.type(screen.getByRole("textbox"), "mario");

    expect(onValueChange).toHaveBeenLastCalledWith("mario");
  });

  it("calls onItemSelect with the clicked item", async () => {
    const user = userEvent.setup({ delay: null });
    const onItemSelect = jest.fn();

    render(
      <DialogSearch
        currentItems={items}
        onValueChange={() => {}}
        onItemSelect={onItemSelect}
        open
        setOpen={() => {}}
      >
        <button>open search</button>
      </DialogSearch>,
    );

    await user.click(screen.getByText("open search"));
    await user.click(screen.getByText("Super Mario 64"));

    expect(onItemSelect).toHaveBeenCalledWith(items[0]);
  });
});
