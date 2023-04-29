import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getPokemon } from '../api/pokeData';
import { useAuth } from '../utils/context/authContext';
import PokeCard from '../components/PokeCard';

function Home() {
  // TODO: Set a state for books
  const [pokemon, setPokemon] = useState([]);

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllTheFavoritePokemon = () => {
    getPokemon(user.uid).then((allPokemon) => {
      const favoritePokemon = allPokemon.filter((poke) => poke.favorite);
      setPokemon(favoritePokemon);
    });
  };
  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheFavoritePokemon();
  }, []);

  return (
    <div className="text-center my-4">
      <Image
        src="https://assets.stickpng.com/images/612ce4761b9679000402af1c.png"
        width="250"
        height="100"
        className="d-inline-block align-top"
        alt="My Pokemon"
      />
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {pokemon.map((poke) => (
          <PokeCard key={pokemon.firebaseKey} pokeObj={poke} onUpdate={getAllTheFavoritePokemon} />
        ))}
      </div>

    </div>
  );
}

export default Home;
