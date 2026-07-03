function RepoCard({ repo, isFav, onToggle }) {
  return (
    <div className="repo-card">
      <div className="repo-header">
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          {repo.name}
        </a>
        <button className={`star-btn ${isFav ? "starred" : ""}`} onClick={() => onToggle(repo)}>
          {isFav ? "★" : "☆"}
        </button>
      </div>
      <p className="repo-desc">{repo.description || "No description"}</p>
      <div className="repo-meta">
        <span>⭐ {repo.stargazers_count}</span>
        {repo.language && <span>{repo.language}</span>}
      </div>
    </div>
  );
}

export default RepoCard;