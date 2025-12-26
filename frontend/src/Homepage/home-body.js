import '../App.css';
import PlaceCards from './home-place-cards';
import { useNavigate } from "react-router-dom";
import { useState } from "react";




/*export default function Body() {
  return <main>
    <div className="main-section" >
      <div className="subsection">
        <h1>Discover Your Next Adventure</h1>
        <div className="hero-search">
          <input  type="text" placeholder="find your next unforgettable journey" />
          <button>Search</button>
        </div>
      </div>


    </div>
    <div className="top-destinations">
      <h2>Top Travel  Destinations </h2>
      <p>Discover the heart of india -culture,colors & timeless journeys</p>

      <div className="div-india-section"> <PlaceCards /></div>
    </div>


  </main>;
}*/

export default function Body() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    navigate("/packages", {
      state: { searchTerm }
    });
  };

  return (
    <main>
      <div className="main-section">
        <div className="subsection">
          <h1>Discover Your Next Adventure</h1>

          <div className="hero-search">
            <input
              type="text"
              placeholder="find your next unforgettable journey"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

        </div>
      </div>

      <div className="top-destinations">
        <h2>Top Travel Destinations</h2>
        <p>Discover the heart of india - culture, colors & timeless journeys</p>

        <div className="div-india-section">
          <PlaceCards />
        </div>
      </div>
    </main>
  );
}

