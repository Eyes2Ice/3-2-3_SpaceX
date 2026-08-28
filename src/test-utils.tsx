import { render as testingLibraryRender } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import React from "react";

export function render(ui: React.ReactElement) {
  return testingLibraryRender(ui, {
    wrapper: ({ children }) => <MantineProvider>{children}</MantineProvider>,
  });
}

export * from "@testing-library/react";
