import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import "./styles/PokeInfoPage.css";

const PokeInfoPage = () => {
  const { name } = useParams();
  const [pokemon, getPokemon] = useFetch();

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    getPokemon(url);
  }, []);
  console.log(pokemon);
  const getStatPercentage = (stat) => (stat / 150) * 100;

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
      <article className="poke-info">
        <div className={`header bg__${pokemon?.types[0].type.name}`}>
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt={pokemon?.name}
          />
        </div>
        <div className="info">
          <h2>#{pokemon?.id}</h2>
          <h2>{pokemon?.name}</h2>
          <ul>
            <li>Peso: {pokemon?.weight / 10} kg</li>
            <li>Altura: {pokemon?.height / 10} m</li>
          </ul>
          <div className="types-abilities">
            <div className="types">
              <h3>Tipo</h3>
              <div className="type-list">
                {pokemon?.types.map((typeInfo) => (
                  <span
                    key={typeInfo.type.name}
                    className={`type ${typeInfo.type.name}`}
                  >
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="abilities">
              <h3>Habilidades</h3>
              <div className="ability-list">
                {pokemon?.abilities.map((abilitiesInfo) => (
                  <span key={abilitiesInfo.ability.url} className="ability">
                    {abilitiesInfo.ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="stat-container">
          <h2>Stats</h2>
          {pokemon?.stats.map((stat, index) => (
            <div className="stat" key={index}>
              <span>{stat.stat.name}:</span>
              <div className="bar">
                <div
                  className="fill"
                  style={{
                    width: `${getStatPercentage(stat.base_stat)}%`,
                  }}
                ></div>
              </div>
              <span>{stat.base_stat}/150</span>
            </div>
          ))}
        </div>

        <div className="moves-container">
          <h2>Movimientos</h2>
          <div className="moves">
            {pokemon?.moves.map((moveInfo, index) => (
              <span className="move" key={index}>
                {moveInfo.move.name}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default PokeInfoPage;
