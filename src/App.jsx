import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Code splitting — each page loads as a separate JS chunk
const SearchPage = lazy(() => import("./pages/SearchPage"));
const UserPage = lazy(() => import("./pages/UserPage"));
const FavouritesPage = lazy(() => import("./pages/FavouritesPage"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Suspense fallback={<p className="loading">Loading...</p>}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/user/:login" element={<UserPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;