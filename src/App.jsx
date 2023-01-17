//importing parts of package (treeshaking only includes that we are using )
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";

import Pet from "./Pet";
import SearchParams from "./SearchParams";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

/**
 * QueryClientProvider : This will wrap our app with the provider necessary to power react-query.
 * We have to give it cache and stale times so that it will actually use its caching layer.
 * Otherwise it'll fetch each time. Here we're saying "never invalidate"
 */
