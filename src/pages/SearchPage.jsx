import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (input.trim()) navigate(`/user/${input.trim()}`);
  };

  return (
    <div className="search-page">
      <h1>GitHub Profile Explorer</h1>
      <p>Search any GitHub username to see their profile and repos.</p>
      <div className="search-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="e.g. manvithh06"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default SearchPage;