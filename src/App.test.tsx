import { screen, render } from "./test-utils.tsx";
import App from "./App.tsx";
import { expect, test, describe, beforeEach } from "vitest";

beforeEach(() => {
  render(<App />);
});

describe("App компонент", function () {
  test("App должен корректно рендериться", () => {
    expect(screen.getByText(/SpaceX/i)).toBeInTheDocument();
  });
});

describe("Тесты для списка запусков", () => {
  test("Запуски должны рендериться после обращения к API", async () => {
    const launchesCards = await screen.findAllByTestId("launch-card");
    expect(launchesCards.length).toBeGreaterThan(0);
  }, 15000);
});
