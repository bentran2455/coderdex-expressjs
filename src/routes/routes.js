const { Router } = require("express");
const express = require("express");
const router = express.Router();
const pokemonData = require("../data/pokemonData");
const paginationMW = require("../middleware/pagination");

router.get("/", paginationMW(pokemonData), (req, res) => {
  res.status(200).json(res.paginationMW);
});

router.get("/search", (req, res) => {
  const query = req.query.q.toLowerCase();
  const nameResult = pokemonData.filter((pokemon) =>
    pokemon.Name.toLowerCase().includes(query)
  );
  res.send(nameResult);
});

router.get("/type", (req, res) => {
  const query = req.query.q.charAt(0).toUpperCase() + req.query.q.slice(1);
  const typeResult = pokemonData.filter((pokemon) =>
    pokemon.types.includes(query)
  );
  res.send(typeResult);
});

router.get("/:pokemonId", (req, res) => {
  const pokemonId = Number(req.params.pokemonId);
  const pokemonIndex = pokemonData.findIndex(
    (pokemon) => pokemon.id === pokemonId
  );
  if (pokemonIndex !== -1) {
    const pokemon = {
      previousPokemon:
        pokemonData[
          pokemonIndex - 1 < 0 ? pokemonData.length - 1 : pokemonIndex - 1
        ],
      pokemon: pokemonData[pokemonIndex],
      nextPokemon:
        pokemonData[
          pokemonIndex + 1 >= pokemonData.length ? 0 : pokemonIndex + 1
        ],
    };
    res.json(pokemon);
  } else {
    res.status(404).send("No pokemon found");
  }
});

module.exports = router;
