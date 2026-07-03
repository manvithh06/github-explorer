import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import RepoCard from "../components/RepoCard";
import useFavourites from "../hooks/useFavourites";

// fetch functions — kept outside component so they don't recreate on render
const fetchUser = (login) =>
  fetch(`https://api.github.com/users/${login}`).then((r) => {
    if (!r.ok) throw new Error(r.status === 403 ? "Rate limit hit. Try again in a minute." : "User not found");
    return r.json();
  });

const fetchRepos = (login) =>
  fetch(`https://api.github.com/users/${login}/repos?per_page=20&sort=updated`)
    .then((r) => {
      if (!r.ok) throw new Error("Could not load repos");
      return r.json();
    });

function UserPage() {
  const { login } = useParams();
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();

  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ["user", login],
    queryFn: () => fetchUser(login),
  });

  const { data: repos, isLoading: reposLoading } = useQuery({
    queryKey: ["repos", login],
    queryFn: () => fetchRepos(login),
    enabled: !!user, // only fetch repos once user is confirmed to exist
  });

  const handleToggle = (repo) => {
    isFavourite(repo.id) ? removeFavourite(repo.id) : addFavourite(repo);
  };

  if (userLoading) return <p className="loading">Loading profile...</p>;
  if (userError) return <p className="error-msg">{userError.message}</p>;

  return (
    <div>
      <div className="profile">
        <img src={user.avatar_url} alt={user.login} />
        <div>
          <h2>{user.name || user.login}</h2>
          <p className="muted">@{user.login}</p>
          {user.bio && <p>{user.bio}</p>}
          <div className="profile-meta">
            <span>{user.followers} followers</span>
            <span>{user.public_repos} repos</span>
          </div>
        </div>
      </div>

      <h3 style={{ margin: "20px 0 12px" }}>Repositories</h3>
      {reposLoading ? (
        <p className="loading">Loading repos...</p>
      ) : (
        <div className="repo-grid">
          {repos?.map((repo) => (
            <RepoCard
              key={repo.id}
              repo={repo}
              isFav={isFavourite(repo.id)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserPage;