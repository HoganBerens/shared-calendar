import React from "react";
import NewEvent from "./NewEvent";
import { render, screen, cleanup } from "@testing-library/react";

test("Render the NewEvent component", () => {
  render(<NewEvent />);
  const newEventElement = screen.getByTestId("newEvent");
  expect(newEventElement).toBeTruthy();
});

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));
