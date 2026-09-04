import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./Dropdown";
import { DropdownItem } from "./types";

const items: DropdownItem[] = [
  { id: 1, name: "Super Mario 64" },
  { id: 2, name: "Ocarina of Time", disabled: true, variant: "danger" },
];

describe("Dropdown", () => {
  it("renders each item's name when open", () => {
    render(
      <Dropdown items={items} onOptionSelect={() => {}} open setOpen={() => {}}>
        <button>trigger</button>
      </Dropdown>,
    );

    expect(screen.getByText("Super Mario 64")).toBeInTheDocument();
    expect(screen.getByText("Ocarina of Time")).toBeInTheDocument();
  });

  it("shows a 'No results' placeholder when there are no items", () => {
    render(
      <Dropdown items={[]} onOptionSelect={() => {}} open setOpen={() => {}}>
        <button>trigger</button>
      </Dropdown>,
    );

    expect(screen.getByText("No results")).toBeInTheDocument();
  });

  it("does not render the item list when closed", () => {
    render(
      <Dropdown
        items={items}
        onOptionSelect={() => {}}
        open={false}
        setOpen={() => {}}
      >
        <button>trigger</button>
      </Dropdown>,
    );

    expect(screen.queryByText("Super Mario 64")).not.toBeInTheDocument();
  });

  it("calls onOptionSelect with the clicked item", async () => {
    const user = userEvent.setup({ delay: null });
    const onOptionSelect = jest.fn();

    render(
      <Dropdown items={items} onOptionSelect={onOptionSelect} open setOpen={() => {}}>
        <button>trigger</button>
      </Dropdown>,
    );

    await user.click(screen.getByText("Super Mario 64"));

    expect(onOptionSelect).toHaveBeenCalledWith(items[0]);
  });

  it("disables the button for disabled items", () => {
    render(
      <Dropdown items={items} onOptionSelect={() => {}} open setOpen={() => {}}>
        <button>trigger</button>
      </Dropdown>,
    );

    expect(screen.getByText("Ocarina of Time").closest("button")).toBeDisabled();
  });
});
