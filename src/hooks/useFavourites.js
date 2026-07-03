import { useState } from "react";

function useFavourites() {
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  const addFavourite = (repo) => {
    const updated = [...favourites, repo];
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  const removeFavourite = (id) => {
    const updated = favourites.filter((r) => r.id !== id);
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  const isFavourite = (id) => favourites.some((r) => r.id === id);

  return { favourites, addFavourite, removeFavourite, isFavourite };
}

export default useFavourites;