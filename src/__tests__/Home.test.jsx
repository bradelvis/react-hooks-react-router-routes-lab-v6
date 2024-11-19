import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routes from "../routes";

// Mock data for testing (example structure of movies)
const movies = [
  { id: 1, title: "Doctor Strange" },
  { id: 2, title: "The Imitation Game" },
  { id: 3, title: "Black Mass" },
];

// Mock the fetch request for the '/movies' endpoint
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(movies),
    })
  );
});

// Define router to reuse in all tests
const router = createMemoryRouter(routes, {
  initialEntries: ["/"],  // Assuming "/" is the Home page route
});

test("renders 'Home Page' inside of an <h1 />", async () => {
  render(<RouterProvider router={router} />);
  const h1 = await screen.findByText(/Home Page/); // Use findByText for async data
  expect(h1).toBeInTheDocument();
  expect(h1.tagName).toBe("H1");
});

test("Displays a list of movie titles", async () => {
  render(<RouterProvider router={router} />);
  // Wait for the movie titles to appear
  const titleList = await screen.findAllByRole("heading", { level: 2 });
  expect(titleList.length).toBeGreaterThan(2);  // Ensure more than 2 titles
  expect(titleList[0].tagName).toBe("H2");
  expect(titleList[0].textContent).toBe("Doctor Strange");
});

test("Displays links for each associated movie", async () => {
  render(<RouterProvider router={router} />);
  // Wait for all movie links to appear
  const linkList = await screen.findAllByText(/View Info/);
  expect(linkList.length).toBeGreaterThan(2);  // Ensure links exist for multiple movies
  expect(linkList[0].href.split("/").slice(3).join("/")).toBe("movie/1");  // Check for the correct link structure
});

test("renders the <NavBar /> component", async () => {
  render(<RouterProvider router={router} />);
  expect(document.querySelector(".navbar")).toBeInTheDocument();
});
