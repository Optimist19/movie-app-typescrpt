import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LayOut from "./pages/LayOut";
import BookMarksPage from "./pages/BookMarksPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import ErrorBoundaryPage from "./pages/ErrorBoundaryPage";
import PageNotFoundPage from "./pages/PageNotFoundPage";
import SearchResultPage from "./pages/SearchResultPage";

import { loader as movieDetailsLoader } from "./components/MovieDetails";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      errorElement: <PageNotFoundPage />,
      children: [
        {
          index: true,
          element: <Home />,
          errorElement: <ErrorBoundaryPage />
        },
        {
          path: "bookmarks",
          element: <BookMarksPage />,
          errorElement: <ErrorBoundaryPage />
        },
        {
          path: "movie/:id",
          element: <MovieDetailsPage />,
          loader: movieDetailsLoader,
          errorElement: <ErrorBoundaryPage />
        },
        {
          path: "search-results",
          element: <SearchResultPage />,
          errorElement: <ErrorBoundaryPage />
        }
      ]
    }
  ]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <RouterProvider router={router} />

        <div className="toggle-mode">
          <ModeToggle />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
