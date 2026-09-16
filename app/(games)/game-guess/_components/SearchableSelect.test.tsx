import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchableSelect from "./SearchableSelect";
import { DropdownItem } from "./ui/types";

const items: DropdownItem[] = [
  { id: 1, name: "Super Mario 64" },
  { id: 2, name: "Ocarina of Time" },
];

describe("SearchableSelect", () => {
  it("renders the search input", () => {
    render(
      <SearchableSelect
        items={items}
        onOptionSelect={() => {}}
        onValueChange={() => {}}
      />,
    );

    expect(
      screen.getByPlaceholderText("Search for a game..."),
    ).toBeInTheDocument();
  });

  it("calls onValueChange as the user types", () => {
    const onValueChange = jest.fn();

    render(
      <SearchableSelect
        items={items}
        onOptionSelect={() => {}}
        onValueChange={onValueChange}
      />,
    );

    fireEvent.input(screen.getByPlaceholderText("Search for a game..."), {
      target: { value: "mario" },
    });

    expect(onValueChange).toHaveBeenLastCalledWith("mario");
  });

  it("opens the dropdown and selects an item on click", async () => {
    const onOptionSelect = jest.fn();

    render(
      <SearchableSelect
        items={items}
        onOptionSelect={onOptionSelect}
        onValueChange={() => {}}
      />,
    );

    const searchBar = screen.getByPlaceholderText("Search for a game...");

    fireEvent.input(searchBar, {
      target: { value: "m" },
    });

    const option = await screen.findByText("Super Mario 64");

    fireEvent.click(option);

    expect(onOptionSelect).toHaveBeenCalledWith(items[0]);
  });
});
