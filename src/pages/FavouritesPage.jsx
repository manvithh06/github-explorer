import useFavourites from "../hooks/useFavourites";
import RepoCard from "../components/RepoCard";

function FavouritesPage() {
  const { favourites, removeFavourite, isFavourite, addFavourite } = useFavourites();

  const handleToggle = (repo) => {
    isFavourite(repo.id) ? removeFavourite(repo.id) : addFavourite(repo);
  };

  if (favourites.length === 0) {
    return (
      <div className="empty-state">
        <div className="emoji">☆</div>
        <p>No favourites yet — star some repos!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: "16px" }}>Starred Repos</h2>
      <div className="repo-grid">
        {favourites.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            isFav={isFavourite(repo.id)}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default FavouritesPage;