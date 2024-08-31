import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import PokeCard from "../components/PokedexPage/PokeCard";
import SelectType from "../components/PokedexPage/SelectType";
import "./styles/PokedexPage.css";

const PokedexPage = () => {
  const trainer = useSelector((states) => states.trainer);
  const [pokemons, getPokemons, getTypePokemons] = useFetch();
  const [searchedName, setSearchedName] = useState("a");
  const [typeSelected, setTypeSelected] = useState("allPokemons");

  useEffect(() => {
    if (typeSelected == "allPokemons") {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
      getPokemons(url);
    } else {
      getTypePokemons(typeSelected);
    }
  }, [typeSelected]);
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchedName(inputName.current.value.trim().toLowerCase());
  };
  const inputName = useRef();
  const callbackFilter = (poke) => {
    const filterName = poke.name.includes(searchedName);
    return filterName;
  };

  return (
    <div>
      <header>
        <div className="header-container">
          <img
            src="../../public/images/pokedex.png"
            alt="pokedex"
            className="logo"
          />
        </div>
        <div className="pokeball"></div>
      </header>
      <p>
        <b className="welcome-trainer">Welcome {trainer},</b> here can your find
        your favorite Pokemons.
      </p>
      <form className="search-bar" onSubmit={handleSearch}>
        <input type="search" ref={inputName} />
        <button>Search</button>
      </form>
      <div className="types">
        <SelectType setTypeSelected={setTypeSelected} />
      </div>
      <section className="pokemons-container flex-container">
        {pokemons && !pokemons.results.some(callbackFilter) ? (
          <h2>There are no Pokemon that match the filter</h2>
        ) : (
          pokemons?.results
            .filter(callbackFilter)
            .map((poke) => <PokeCard key={poke.url} poke={poke} />)
        )}
      </section>
    </div>
  );
};

export default PokedexPage;
