import { screen, render, waitFor, within } from "../../test-utils.tsx";
import App from "../../App.tsx";
import { expect, test, describe, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);

  render(<App />);
});

afterEach(() => {
  const modalRoot = document.getElementById("modal");
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
});

describe("Компонент модалки", function () {
  test("Модалки не должно быть на экране при первичном рендере приложения", () => {
    const modal = screen.queryByTestId("modal");
    expect(modal).not.toBeInTheDocument();
  });

  test("При нажатии по любой из кнопок в карточках с запусками должна открываться модалка", async () => {
    const user = userEvent.setup();
    const launchButtons = await screen.findAllByTestId("launch-button");

    await user.click(launchButtons[0]);

    const modal = await screen.findByTestId("modal");
    expect(modal).toBeInTheDocument();
  });

  test("При нажатии по кнопке закрытия в модалке, модалка должна закрываться", async () => {
    const user = userEvent.setup();

    const launchButtons = await screen.findAllByTestId("launch-button");
    await user.click(launchButtons[0]);

    const modal = await screen.findByTestId("modal");
    expect(modal).toBeInTheDocument();

    const closeButton = within(modal).getByRole("button");

    await user.click(closeButton);

    await waitFor(() => {
      const closedModal = screen.queryByTestId("modal");
      expect(closedModal).not.toBeInTheDocument();
    });
  }, 15000);

  test("При нажатии по оверлею вне модалки, модалка должна закрываться", async () => {
    const user = userEvent.setup();

    const launchButtons = await screen.findAllByTestId("launch-button");
    await user.click(launchButtons[0]);

    const modal = await screen.findByTestId("modal");
    expect(modal).toBeInTheDocument();

    const overlay = within(modal).getByRole("button");

    await user.click(overlay);

    await waitFor(() => {
      const closedModal = screen.queryByTestId("modal");
      expect(closedModal).not.toBeInTheDocument();
    });
  });

  test("Внутри модалки должна содержаться информация именно о том запуске, из карточки которого модалка была открыта", async () => {
    const user = userEvent.setup();

    const launchButtons = await screen.findAllByTestId("launch-button");
    await user.click(launchButtons[0]);

    const modal = await screen.findByTestId("modal");
    expect(modal).toBeInTheDocument();

    const firstLaunchDetails =
      "Engine failure at 33 seconds and loss of vehicle";

    const detailsElement = within(modal).getByText(firstLaunchDetails);

    expect(detailsElement).toBeInTheDocument();
  });
});
