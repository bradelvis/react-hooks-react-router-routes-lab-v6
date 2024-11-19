import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routes from "../routes";

// Mock data for actors and movies
const actors = [
  {
    name: "Benedict Cumberbatch",
    movies: ["Doctor Strange", "The Imitation Game", "Black Mass"],
  },
  {
    name: "Justin Timberlake",
    movies: ["Trolls", "Friends with Benefits", "The Social Network"],
  },
  {
    name: "Anna Kendrick",
    movies: ["Pitch Perfect", "Into The Wood"],
  },
  {
    name: "Tom Cruise",
    movies: [
      "Jack Reacher: Never Go Back",
      "Mission Impossible 4",
      "War of the Worlds",
    ],
  },
];

// Mock the fetch request for the '/actors' endpoint
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(actors),
    })
  );
});

const router = createMemoryRouter(routes, {
  initialEntries: ["/actors"],
  initialIndex: 0,
});

test("renders without any errors", () => {
  const errorSpy = jest.spyOn(global.console, "error");

  render(<RouterProvider router={router} />);

  expect(errorSpy).not.toHaveBeenCalled();

  errorSpy.mockRestore();
});

test("renders 'Actors Page' inside of the <h1 />", () => {
  render(<RouterProvider router={router} />);
  const h1 = screen.queryByText(/Actors Page/);
  expect(h1).toBeInTheDocument();
  expect(h1.tagName).toBe("H1");
});

test("renders each actor's name", async () => {
  render(<RouterProvider router={router} />);
  for (const actor of actors) {
    // Use findByText to wait for actor names
    expect(await screen.findByText(actor.name, { exact: false })).toBeInTheDocument();
  }
});

test("renders a <li /> for each movie", async () => {
  render(<RouterProvider router={router} />);
  for (const actor of actors) {
    for (const movie of actor.movies) {
      // Use findAllByText for multiple <li> elements
      const li = await screen.findByText(movie, { exact: false });
      expect(li).toBeInTheDocument();
      expect(li.tagName).toBe("LI");
    }
  }
});

test("renders the <NavBar /> component", () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/actors"],
  });
  render(<RouterProvider router={router} />);
  expect(document.querySelector(".navbar")).toBeInTheDocument();
});
