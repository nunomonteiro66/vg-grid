import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchInput from "./SearchInput";

describe("SearchInput", () => {
  it("renders the given placeholder", () => {
    render(
      <SearchInput
        placeholder="Search for a game..."
        currentSearch=""
        onValueChange={() => {}}
      />,
    );

    expect(
      screen.getByPlaceholderText("Search for a game..."),
    ).toBeInTheDocument();
  });

  it("shows the current search value", () => {
    render(
      <SearchInput currentSearch="zelda" onValueChange={() => {}} />,
    );

    expect(screen.getByRole("textbox")).toHaveValue("zelda");
  });

  it("calls onValueChange with the typed text", async () => {
    const user = userEvent.setup({ delay: null });
    const onValueChange = jest.fn();

    function Wrapper() {
      const [value, setValue] = useState("");
      return (
        <SearchInput
          currentSearch={value}
          onValueChange={(text: string) => {
            setValue(text);
            onValueChange(text);
          }}
        />
      );
    }

    render(<Wrapper />);

    await user.type(screen.getByRole("textbox"), "mario");

    expect(onValueChange).toHaveBeenLastCalledWith("mario");
  });
});
