import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setTrainer } from "../store/slices/trainer.slice";
import { useNavigate } from "react-router-dom";
import "./styles/HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainer(inputTrainer.current.value.trim()));
    navigate("/pokedex");
  };
  const inputTrainer = useRef();

  return (
    <div className="body">
      <div className="container">
        <div className="logo">
          <img
            className="pokedex"
            src="../../images/pokedexHome.png"
            alt="pokedex"
          />
        </div>
        <h2 className="hi">!Hi trainer¡</h2>
        <p className="insert">
          If you want to find your favorite pokemon, please give me your trainer
          name
        </p>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputTrainer}
            type="search"
            placeholder="Write your trainer name"
          />
          <button>Catch them all</button>
        </form>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="pokeball"></div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
