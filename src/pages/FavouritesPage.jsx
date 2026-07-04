if (favourites.length === 0) {
  return (
    <div className="empty-state">
      <div className="emoji">☆</div>
      <p>No favourites yet — star some repos!</p>
    </div>
  );
}