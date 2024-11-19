import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import routes from "../routes";

// Mock data for directors and their movies
const directors = [
  {
    name: "Scott Derrickson",
    movies: ["Doctor Strange", "Sinister", "The Exorcism of Emily Rose"],
  },
  {
    name: "Mike Mitchell",
    movies: ["Trolls", "Alvin and the Chipmunks: Chipwrecked", "Sky High"],
  },
  {
    name: "Edward Zwick",
    movies: ["Jack Reacher: Never Go Back", "Blood Diamond", "The Siege"],
  },
];

// Mock the fetch request for the '/directors' endpoint
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(directors),
    })
  );
});

const router = createMemoryRouter(routes, {
  initialEntries: ["/directors"],
  initialIndex: 0,
});

test("renders without any errors", () => {
  const errorSpy = jest.spyOn(global.console, "error");

  render(<RouterProvider router={router} />);

  expect(errorSpy).not.toHaveBeenCalled();

  errorSpy.mockRestore();
});

test("renders the <NavBar /> component", () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/directors'],
  });
  render(<RouterProvider router={router} />);
  expect(document.querySelector(".navbar")).toBeInTheDocument();
});
