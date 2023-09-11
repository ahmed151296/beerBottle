import "./App.css";
import { useEffect, useState } from "react";
import BeerCard from "./BeerCard";
import SearchBar from "./SearchBar";

function App() {
  const [beers, setBeers] = useState([]);

  const [isSearchCountShown, setIsSearchCountShown] = useState(false);

  useEffect(() => {
    (async () => {
      let beerData;
      try {
        const response = await fetch("https://api.punkapi.com/v2/beers");

        beerData = await response.json();
      } catch (error) {
        console.log(error);
        beerData = [];
      }
      setBeers(beerData);
    })();
  }, []);

  const handleSearchBeer = async keyword => {
    let beerData = [];

    try {
      // the endpoint requires us to replace spaces with underscores
      const formattedKeyword = keyword.replace(" ", "_");

      // makes the api request with the keyword included
      const response = await fetch(
        keyword !== ""
          ? `https://api.punkapi.com/v2/beers?beer_name=${formattedKeyword}`
          : "https://api.punkapi.com/v2/beers",
      );

      beerData = await response.json();

      // since you specifically want one letter keyword
      // to match beers that start with that said letter
      // we need to filter it again manually since this API
      // doesn't come with that feature
      if (keyword.length === 1) {
        beerData = beerData.filter(
          beer => beer.name[0].toLowerCase() === keyword.toLowerCase(),
        );
      }

      // update the states
      setBeers(beerData);
      setIsSearchCountShown(true);
    } catch (error) {
      console.log(error);
      beerData = [];
    }
  };

  return (
    <div className="App">
      <SearchBar
        onSearch={handleSearchBeer}
        onChange={() => setIsSearchCountShown(false)}
        placeholder="Search Beers..."
      />

      {/* show the search amount */}
      {isSearchCountShown && (
        <span className="beer-search-count">
          {beers.length} beers were found.
        </span>
      )}

      <div className="cards-container">
        {beers.map((beers, index) => (
          <BeerCard beerData={beers} key={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
